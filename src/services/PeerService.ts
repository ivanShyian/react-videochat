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
  return new Peer(userId, {
    host: 'localhost',
    port: 3001,
    path: '/peerjs',
    secure: false,
    // debug: 3
  })
}

class PeerService {
  peer: Peer
  constructor(userId: string) {
    this.peer = initializePeer(userId)
    this.subscribePeerEvents()
  }

  subscribePeerEvents() {
    this.peer.on('call', async(call) => {
      peerEvents.emit('onCallReceive', {
        callerId: call.peer,
        roomId: call.metadata.roomId,
        type: 'receiver',
        call
      })

      call.on('close', () => {
        peerEvents.emit('onCallClose', call.metadata.roomId)
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
      })

      call.on('close', () => {
        peerEvents.emit('onCallClose', call.metadata.roomId)
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

  getPeerInstance() {
    return this.peer
  }
}

export default PeerService
