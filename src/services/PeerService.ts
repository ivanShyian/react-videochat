import Peer, {MediaConnection} from 'peerjs'
import { peerEvents } from '@/use/useCall'
import {IChatCall} from '@/models/IChat'

export interface ICallPayload {
  receiverId: string,
  roomId: string,
  myVideoStream: MediaStream,
  callData: IChatCall
}

export interface IAnswerPayload extends Omit<ICallPayload, 'receiverId'> {
  callInstance: MediaConnection
}

const initializePeer = (userId: string) => {
  const isLocalhost = import.meta.env.VITE_PEERJS_HOST === 'localhost'

  return new Peer(userId, {
    host: import.meta.env.VITE_PEERJS_HOST,
    port: import.meta.env.VITE_PEERJS_PORT,
    path: '/peerjs',
    secure: !isLocalhost,
    debug: 3
  })
}

class PeerService {
  peer: Peer
  isCallRunning: boolean

  constructor(userId: string) {
    this.peer = initializePeer(userId)
    this.isCallRunning = false
    this.subscribePeerEvents()
  }

  subscribePeerEvents() {
    this.peer.on('call', async(call) => {
      this.callRunning = true
      peerEvents.emit('onCallReceive', {
        callerId: call.peer,
        roomId: call.metadata.roomId,
        type: 'receiver',
        call
      })

      call.on('close', () => {
        if (this.callRunning) {
          peerEvents.emit('onCallClose', call.metadata.roomId)
          this.callRunning = false
        }
      })
    })

    this.peer.on('error', (err) => {
      console.log({err})
    })
  }

  call(payload: ICallPayload) {
    const {receiverId, myVideoStream, roomId} = payload
    const call = this.peer.call(receiverId, myVideoStream, {metadata: {roomId}})
    if (call) {
      call.on('stream', async(userVideoStream: MediaStream) => {
        peerEvents.emit('peerStream', {...payload, userVideoStream, call})
        this.callRunning = true
      })

      call.on('close', () => {
        if (this.callRunning) {
          peerEvents.emit('onCallClose', call.metadata.roomId)
          this.callRunning = false
        }
      })
    }
  }

  receiveCall(payload: IAnswerPayload) {
    const {callInstance, myVideoStream} = payload
    callInstance.answer(myVideoStream)
    callInstance.on('stream', (userVideoStream: MediaStream) => {
      peerEvents.emit('peerStream', {...payload, userVideoStream})
    })
  }


  set peerInstance(peer: Peer) {
    this.peer = peer
  }

  get peerInstance() {
    return this.peer
  }

  set callRunning(val: boolean) {
    this.isCallRunning = val
  }

  get callRunning(): boolean {
    return this.isCallRunning
  }
}

export default PeerService
