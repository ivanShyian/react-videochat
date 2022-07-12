import Peer from 'peerjs'

const initializePeer = (userId: string) => {
  return new Peer(userId, {
    host: 'localhost',
    port: 3001,
    path: '/',
    secure: false
  })
}

async function wrapper(data: string) {
  return new Promise((resolve, reject) => {
  })
}

class PeerService {
  peer: Peer
  events: any

  constructor(userId: string, events: any) {
    this.events = events
    this.peer = initializePeer(userId)
    this.subscribeEvents()
  }

  subscribeEvents() {
    this.peer.on('open', (userId) => {
      this.events.startCall()
    })
  }

  connectWithUser(userId: string, stream: MediaStream) {
    const call = this.peer.call(userId, stream)
    
    call.on('stream', (userVideoStream: MediaStream) => {
      this.events.addVideoStream(userVideoStream)
    })

    call.on('close', () => {
      this.events.removeMemberVideo
    })
  }

  get getPeer() {
    return this.peer
  }
}

export default PeerService
