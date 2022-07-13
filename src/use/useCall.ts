import { useEffect, useRef, useState } from 'react'
import { useTypedSelector } from './useTypedSelector'
import Peer, { MediaConnection } from 'peerjs'

export interface ICallReturnStatement {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoRefMember: React.RefObject<HTMLVideoElement>;
  callStarted: boolean;
  callRequest: null | {roomId: string, callerId: string}
  onCallUser: (roomId: string, userToCall: string) => Promise<void>
  acceptCall: () => void
  declineCall: () => void
}

interface ICallInterface {
  roomId: string,
  callerId: string
  callInstance: MediaConnection
} 

export const useCall = (): ICallReturnStatement => {
  const {user} = useTypedSelector(selector => selector.auth)
  const [callStarted, setCallStarted] = useState<boolean>(false)
  const [callRequest, setCallRequest] = useState<ICallInterface | null>(null)
  const [peer, setPeer] = useState<Peer | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRefMember = useRef<HTMLVideoElement>(null)


  useEffect(() => {
    const myPeer = new Peer(user.id, {
      host: 'localhost',
      port: 3001,
      path: '/',
      secure: false,
      // debug: 3
    })

    myPeer.on('open', (id: string) => {
    })

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


  const onCallUser = async(roomId: string, userToCall: string) => {
    const stream = await createStream()
    if (stream) {
      connectWithUser(userToCall, roomId, stream)
      setCallStarted(true)
    }
  }

  const connectWithUser = (userId: string, roomId: string, stream: MediaStream) => {
    if (peer) {
      const call = peer.call(userId, stream, {
        metadata: {roomId}
      })
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      addVideoStream(videoRef.current, stream)
      return stream
    }
  }

  const acceptCall = async() => {
    if (callRequest) {
      const stream = await createStream()
      callRequest.callInstance.answer(stream)
      callRequest.callInstance.on('stream', (userVideoStream: MediaStream) => {
        addVideoStream(videoRefMember.current!, userVideoStream)
      })
      setCallStarted(true)
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
    callStarted,
    callRequest,
    onCallUser,
    acceptCall,
    declineCall
  }
}
