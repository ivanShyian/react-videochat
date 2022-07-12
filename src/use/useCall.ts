import { useEffect, useRef, useState } from 'react'
import SocketService from '../services/SocketService'
import PeerService from '../services/PeerService'
import { useTypedSelector } from './useTypedSelector'

export const useCall = () => {
  const {user} = useTypedSelector(selector => selector.auth)
  const [callStarted, setCallStarted] = useState<boolean>(false)
  const [peerInstance, setPeerInstance] = useState<PeerService | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRefMember = useRef<HTMLVideoElement>(null)

  const startCall = (userToCall: string) => {
    setCallStarted(true)
    initVideoCall(userToCall)
  }

  const addVideoStream = async(video: HTMLVideoElement, stream: MediaStream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', function() {
      this.play()
    })
  }

  const removeMemberVideo = () => {
    videoRefMember.current?.remove()
  }

  const onCallUser = (roomId: string, userToCall: string) => {
    const myPeer = new PeerService(user.id, {
      startCall: () => startCall(userToCall),
      addVideoStream: (stream: MediaStream) => addVideoStream(videoRefMember.current!, stream),
      removeMemberVideo
    })
    setPeerInstance(myPeer)
  }

  const initVideoCall = async(userToCall: string) => {
    if (videoRef.current) {
      videoRef.current.muted = true
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
  
      addVideoStream(videoRef.current!, stream)
      // peerInstance?.connectWithUser(userToCall, stream)
    }
  }


  return {
    videoRef,
    videoRefMember,
    callStarted,
    onCallUser
  }
}