import { Socket, io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { Cookies } from 'react-cookie'
import { bindActionCreators, Store } from 'redux'
import { MessagesActionCreators } from '@/store/reducers/messages/action-creators'
import {IMessage, IMessageSend} from '@/models/IMessage'
import { ChatsActionCreators } from '@/store/reducers/chats/action-creators'
import moment from 'moment'
import objectHasOwnProperty from '@/utils/objectHasOwnProperty'
import {callEvents} from '@/use/useCall'
import {ServerToClientEvents, ClientToServerEvents, SocketServerActions, SocketClientActions} from '@/models/ISocket'

let store: Store

export const injectStoreInSockets = (_store: Store) => {
  store = _store
}

const cookie = new Cookies()

const initializeSocketConnection = (host: string, userId: string, clientId: string): Socket<ServerToClientEvents, ClientToServerEvents> => {
  return io(host, {
    autoConnect: false,
    path: '/ws',
    auth: {
      userId,
      clientId
    }
  })
}

class SocketService {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  clientId: string
  userId: string
  connected: boolean

  constructor(host: string, userId: string, clientId?: string | undefined) {
    this.userId = userId
    this.clientId = clientId === undefined ? uuidv4() : clientId as string
    this.connected = false
    this.socket = initializeSocketConnection(host, this.userId, this.clientId)

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
      this.socket.emit(SocketClientActions.Identity, {
        userId: this.userId,
        clientId: this.clientId,
      })
    })

    this.socket.on(SocketServerActions.OnlineRoomList, (rooms) => {
      const chats = store.getState().chats.chats
      rooms.forEach((room) => {
        if (objectHasOwnProperty(chats, room)) {
          store.dispatch(ChatsActionCreators.setIsOnline(room, true))
        }
      })
    })

    this.socket.on(SocketServerActions.UserConnectedToRoom, ({userId, room}) => {
      console.log('conn', userId)
      store.dispatch(ChatsActionCreators.setIsOnline(room, true))
    })

    this.socket.on(SocketServerActions.NewMessage, (content) => {
      store.dispatch(MessagesActionCreators.setMessage(content.chatroom_id, content))
      store.dispatch(ChatsActionCreators.updateLastMessage(content))
    })

    this.socket.on(SocketServerActions.JoinToRoom, ({room}) => {
      bindActionCreators(ChatsActionCreators.getSingleChatByRoom, store.dispatch)(room)
    })

    this.socket.on(SocketServerActions.UserDisconnected, ({ userId, room }) => {
      console.log('disc', userId, room)
      store.dispatch(ChatsActionCreators.setIsOnline(room, false))
      callEvents.emit('user_disconnected', room)
    })

    this.socket.on(SocketServerActions.UserEndCall, ({room}) => {
      callEvents.emit('end_call', room)
    })

    this.socket.on(SocketServerActions.UserDeclineCall, ({room}) => {
      callEvents.emit('declined_call', room)
    })
  }

  subscribeToAllChats(rooms: string[]) {
    this.socket.emit(SocketClientActions.Join, rooms)
  }

  joinToRoomWithUser(room: string, otherUserId: string) {
    this.socket.emit(SocketClientActions.Subscribe, { room, otherUserId })
  }

  sendMessageToUser(content: IMessageSend) {
    this.socket.emit(SocketClientActions.Message, content)
  }

  emitUserEndCall(roomId: string) {
    this.socket.emit(SocketClientActions.CallEnd, {room: roomId})
  }

  emitUserDeclineCall(roomId: string) {
    this.socket.emit(SocketClientActions.CallDeclined, {room: roomId})
  }

  // leaveFromRoom(room: string) {
  //   this.socket.emit('unsubscribe', room)
  // }
}

export default SocketService
