import { Socket, io } from 'socket.io-client'
import { Cookies } from 'react-cookie'
import { v4 as uuidv4 } from 'uuid'
import { bindActionCreators, Store } from 'redux'
import { MessagesActionCreators } from '@/store/reducers/messages/action-creators'
import { IMessage } from '@/models/IMessage'
import { ChatsActionCreators } from '@/store/reducers/chats/action-creators'
import moment from 'moment'
import Peer from 'peerjs'

let store: Store

export const injectStoreInSockets = (_store: Store) => {
  store = _store
}

const cookie = new Cookies()

const initializeSocketConnection = (host: string, clientId: string) => {
  return io(host, {
    autoConnect: false,
    path: '/ws',
    auth: {userId, clientId}
  })
}

class SocketService {
  socket: Socket
  clientId: string
  userId: string
  connected: boolean

  constructor(host: string, userId: string, clientId?: string | undefined) {
    this.userId = userId
    this.clientId = clientId === undefined ? uuidv4() : clientId as string
    this.connected = false
    this.socket = initializeSocketConnection(host, this.clientId)

    if (clientId === undefined) cookie.set('sid', this.clientId, {path: '/', expires: moment().add(3, 'days').toDate()})
  }

  connect() {
    if (this.connected) return
    this.subscribeEvents()
    this.socket.connect()
    this.connected = true
  }

  subscribeEvents() {
    this.socket.on('connect', () => {
      this.socket.emit('identity', {
        userId: this.userId,
        clientId: this.clientId,
      })
    })

    this.socket.on('user-connected', () => {
      console.log('did')
    })

    this.socket.on('new_message', (content: IMessage) => {
      store.dispatch(MessagesActionCreators.setMessage(content.chatroom_id, content))
      store.dispatch(ChatsActionCreators.updateLastMessage(content))
    })

    this.socket.on('join_to_room', (data) => {
      bindActionCreators(ChatsActionCreators.getSingleChatByRoom, store.dispatch)(data.room)
    })
  }

  subscribeToAllChats(rooms: string[]) {
    this.socket.emit('join', rooms)
  }

  joinToRoomWithUser(room: string, otherUserId: string) {
    this.socket.emit('subscribe', { room, otherUserId })
  }

  leaveFromRoom(room: string) {
    this.socket.emit('unsubscribe', room)
  }

  sendMessageToUser(content: any) {
    this.socket.emit('message', content)
  }

  // sendStreamToUser(receiverId: string, stream: MediaStream) {
  //   this.socket.emit('send_stream', {receiverId, stream})
  // }
}

const userId = cookie.get('userData')?.id
const socketId = cookie.get('sid')

export default new SocketService('ws://localhost:8080', userId, socketId)
