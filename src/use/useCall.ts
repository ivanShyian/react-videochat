import {useEffect, useRef, useState, RefObject, useMemo} from 'react'
import { useTypedSelector } from './useTypedSelector'
import Peer, { MediaConnection } from 'peerjs'
import objectHasOwnProperty from '@/utils/objectHasOwnProperty'
import {useLocation, useNavigate} from 'react-router-dom'

export interface ICallReturnStatement {
  videoRef: RefObject<HTMLVideoElement>;
  videoRefMember: RefObject<HTMLVideoElement>;
  callRequest: null | {roomId: string, callerId: string}
  onCallUser: (roomId: string, userToCall: string) => Promise<void>
  acceptCall: () => void
  declineCall: () => void
  isCallView: boolean
}

interface ICallInterface {
  roomId: string,
  callerId: string
  callInstance: MediaConnection
}

export const useCall = (): ICallReturnStatement => {
  const {user} = useTypedSelector(selector => selector.auth)
  const {chats} = useTypedSelector(selector => selector.chats)
  const [isCallView, setCallView] = useState<boolean>(false)
  const [callRequester, setCallRequester] = useState<{roomId: string, userToCall: string} | null>(null)
  const [callRequest, setCallRequest] = useState<ICallInterface | null>(null)
  const [peer, setPeer] = useState<Peer | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRefMember = useRef<HTMLVideoElement>(null)


  useEffect(() => {
    if (peer) return

    const myPeer = new Peer(user.id, {
      host: 'localhost',
      port: 3001,
      path: '/',
      secure: false,
      debug: 3
    })

    // myPeer.on('open', (id: string) => {
    // })

    myPeer.on('call', async(call) => {
      setCallRequest({
        callInstance: call,
        roomId: call.metadata.roomId,
        callerId: call.peer
      })
    })

    myPeer.on('error', (err) => {
      console.log({err})
    })


    setPeer(myPeer)
  }, [])

  // Caller
  useEffect(() => {
    if (isCallView && callRequester) {
      createStreamAndConnectWithUser(callRequester.userToCall, callRequester.roomId)
    }
  }, [isCallView])

  // Receiver
  useEffect(() => {
    if (isCallView && callRequest && videoRef.current) {
      acceptCallStream()
    }
  }, [isCallView && callRequest && videoRef.current])

  const onCallUser = async(roomId: string, userToCall: string) => {
    // chats && objectHasOwnProperty(chats, roomId) && chats[roomId].isOnline
    if (chats && objectHasOwnProperty(chats, roomId) && chats[roomId].isOnline) {
      setCallRequester({
        userToCall,
        roomId
      })
      setCallView(true)
      return
    }
    console.log('nope')
  }

  const createStreamAndConnectWithUser = async(userToCall: string, roomId: string) => {
    const stream = await createStream()
    console.log({ stream })
    if (stream) {
      connectWithUser(userToCall, roomId, stream)
      return
    }
  }

  const connectWithUser = (userId: string, roomId: string, stream: MediaStream) => {
    console.log(peer)
    if (peer) {
      const call = peer.call(userId, stream, {
        metadata: {roomId}
      })
      console.log(call)
      if (call) {
        call.on('stream', async(userVideoStream: MediaStream) => {
          await addVideoStream(videoRefMember.current!, userVideoStream)
        })
        call.on('close', () => {
          removeMemberVideo()
        })
      }
    }
  }

  const createStream = async() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      console.log(navigator.mediaDevices)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      addVideoStream(videoRef.current, stream)
      return stream
    }
  }

  const acceptCall = () => {
    if (callRequest) {
      setCallView(true)
    }
  }

  const acceptCallStream = async() => {
    if (callRequest) {
      const stream = await createStream()
      callRequest.callInstance.answer(stream)
      callRequest.callInstance.on('stream', (userVideoStream: MediaStream) => {
        addVideoStream(videoRefMember.current!, userVideoStream)
      })
    }
  }

  const declineCall = () => {}

  const addVideoStream = async(video: HTMLVideoElement, stream: MediaStream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', function() {
      this.play()
    })
  }

  const removeMemberVideo = () => {
    videoRefMember.current?.remove()
  }

  return {
    videoRef,
    videoRefMember,
    callRequest,
    onCallUser,
    acceptCall,
    declineCall,
    isCallView
  }
}
