import {useEffect, useRef, useState, RefObject, useMemo, useCallback} from 'react'
import {useTypedSelector} from './useTypedSelector'
import {MediaConnection} from 'peerjs'
import {useNavigate, useParams} from 'react-router-dom'
import {useActions} from '@/use/useActions'
import {ChatsActionCreators} from '@/store/reducers/chats/action-creators'
import {IChat} from '@/models/IChat'
import EventEmitter from '@/utils/EventEmiiter'
import {SocketService} from '@/use/useChat'
import PeerService, {ICallPayload} from '../services/PeerService'
import {toast} from 'react-toastify'

export interface ICallReturnStatement {
  videoRef: RefObject<HTMLVideoElement>;
  videoRefMember: RefObject<HTMLVideoElement>;
  onCallUser: (roomId: string, userToCall: string) => Promise<void>
  acceptCall: (roomId: string) => void
  isCallView: boolean
  currentChat: IChat | undefined
  closeCall: () => void
  declineCall: (roomId: string) => void
  toggleAudioStream: () => void
  toggleVideoStream: () => void
  isCallEstablished: boolean
}

type TCallPayload = ICallPayload & {
  userVideoStream: MediaStream
  call: MediaConnection
}

export let callEvents: EventEmitter
export let peerEvents: EventEmitter
let peerService: PeerService
let tempStream: MediaStream | null

export const useCall = (): ICallReturnStatement => {
  const params = useParams()
  const navigate = useNavigate()

  const {user} = useTypedSelector(selector => selector.auth)
  const {chats} = useTypedSelector(selector => selector.chats)
  const {addCallData, removeCallData} = useActions(ChatsActionCreators.addCallData, ChatsActionCreators.removeCallData)

  const [peerExists, setPeerExists] = useState<boolean>(false)
  const [isCallView, setCallView] = useState<boolean>(false)
  const [isCallEstablished, setCallEstablished] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRefMember = useRef<HTMLVideoElement>(null)

  const currentChat = useMemo(() => {
    if (params && params.chatId && chats[params.chatId]) {
      return chats[params.chatId]
    }
    return undefined
  }, [chats, params])


  // Init
  useEffect(() => {
    if (!peerExists && chats) {
      initPeer()
    }
  }, [chats])

  useEffect(() => {
    if (chats) {
      initPeerEmitter()
      initSocketEmitter()
    }
  }, [chats])

  // Caller
  useEffect(() => {
    if (currentChat?.callData?.type === 'caller' && params.chatId && videoRef.current) {
      if (videoRef.current.srcObject instanceof MediaStream) return
      connectWithUser(currentChat.callData.receiverId!, params.chatId)
    }
  }, [isCallView, currentChat])

  // Receiver
  useEffect(() => {
    if (isCallView && currentChat?.callData?.type === 'receiver' && videoRef.current) {
      if (videoRef.current.srcObject instanceof MediaStream) return
      acceptCallStream()
    }
  }, [isCallView, currentChat])

  // Chat change handling
  useEffect(() => {
    if (!!(params.chatId && currentChat?.callData)) {
      setCallView(true)
      setCallEstablished(true)
      return
    }
    setCallView(false)
    setCallEstablished(false)
  }, [params])

  const initSocketEmitter = () => {
    callEvents = new EventEmitter()

    callEvents.on('end_call', endCall)
    callEvents.on('user_disconnected', (roomId: string) => {
      if (chats[roomId]?.callData) endCall()
    })
    callEvents.on('declined_call', (room) => {
      if (tempStream) {
        removeTracks(tempStream)
        tempStream = null
      }
      endCall(room)
      toast.info('User busy!')
    })
  }

  const initPeerEmitter = () => {
    peerEvents = new EventEmitter()

    peerEvents.on('onCallReceive', (payload: {call: MediaConnection, callerId: string, roomId: string, type: string}) => {
      const {roomId, ...callPayload} = payload
      addCallData(roomId, {...callPayload})
    })

    peerEvents.on('peerStream', async(payload: TCallPayload) => {
      const {callData, ...streamPayload} = payload
      await injectMyVideoStream(streamPayload.myVideoStream)
      await addVideoStream(videoRefMember.current!, streamPayload.userVideoStream)
      addCallData(streamPayload.roomId, {
        ...callData,
        ...streamPayload
      })
      setCallEstablished(true)
    })

    peerEvents.on('onCallClose', endCall)
  }

  const initPeer = () => {
    peerService = new PeerService(user.id)
    setPeerExists(!!peerService.peerInstance)
  }

  const onCallUser = async(roomId: string, receiverId: string) => {
    if (currentChat?.isOnline) {
      addCallData(roomId, {
        receiverId,
        type: 'caller'
      })
      return setCallView(true)
    }
    toast.info('User currently offline 😴')
  }

  const connectWithUser = async(receiverId: string, roomId: string) => {
    if (peerExists) {
      if (currentChat?.callData?.userVideoStream && currentChat?.callData?.myVideoStream) {
        await injectMyVideoStream(currentChat.callData.myVideoStream)
        return addVideoStream(videoRefMember.current!, currentChat.callData.userVideoStream)
      }
      const stream = await createStream()
      if (stream && currentChat?.callData) {
        tempStream = stream
        peerService.call({
          myVideoStream: stream,
          callData: currentChat.callData,
          receiverId,
          roomId
        })
      }
    }
  }

  const createStream = async() => {
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
  }

  const injectMyVideoStream = (stream: MediaStream) => {
    if (videoRef.current) {
      videoRef.current.muted = true
      return addVideoStream(videoRef.current, stream)
    }
  }

  const acceptCall = (roomId: string) => {
    navigate(`/chats/${roomId}`)
  }

  const acceptCallStream = async() => {
    if (currentChat?.callData) {
      if (currentChat.callData.userVideoStream && currentChat.callData.myVideoStream) {
        await injectMyVideoStream(currentChat.callData.myVideoStream)
        return addVideoStream(videoRefMember.current!, currentChat.callData.userVideoStream)
      }
      const stream = await createStream()
      if (stream && currentChat.callData.call && params.chatId) {
        peerService.receiveCall({
          callData: currentChat.callData,
          callInstance: currentChat.callData.call,
          roomId: params.chatId,
          myVideoStream: stream
        })
      }
    }
  }

  const declineCall = (roomId: string) => {
    if (roomId) {
      SocketService.emitUserDeclineCall(roomId)
      removeCallData(currentChat?.id || params?.chatId || undefined)
    }
  }

  const closeCall = () => {
    if (currentChat?.callData?.call) {
      currentChat.callData.call.close()
      SocketService.emitUserEndCall(currentChat.id)
    }
  }

  const endCall = useCallback((roomId?: string) => {
    const room = currentChat?.id || params?.chatId || roomId || undefined
    const chat = !!room && chats[room]
    if (chat) {
      chat.callData?.call?.off('close')
      if (videoRef.current && videoRefMember.current) {
        videoRefMember.current.remove()
        videoRef.current.remove()
      }
      if (chat?.callData?.myVideoStream) removeTracks(chat.callData.myVideoStream)
      setCallView(false)
      removeCallData(room)
    }
  }, [currentChat])

  const removeTracks = (stream: MediaStream) => {
    stream.getTracks().forEach((track) => {
      track.stop()
    })
  }

  const addVideoStream = async(video: HTMLVideoElement, stream: MediaStream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', function() {
      this.play()
    })
  }

  const toggleAudioStream = () => {
    if (currentChat?.callData?.myVideoStream) {
      currentChat.callData.myVideoStream.getAudioTracks()[0].enabled = !currentChat.callData.myVideoStream.getAudioTracks()[0].enabled
    }
  }

  const toggleVideoStream = () => {
    if (currentChat?.callData?.myVideoStream) {
      currentChat.callData.myVideoStream.getVideoTracks()[0].enabled = !currentChat.callData.myVideoStream.getVideoTracks()[0].enabled
    }
  }

  return {
    videoRef,
    videoRefMember,
    onCallUser,
    acceptCall,
    declineCall,
    isCallView,
    currentChat,
    closeCall,
    toggleAudioStream,
    toggleVideoStream,
    isCallEstablished
  }
}
