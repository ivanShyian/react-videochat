import {IMessage, IMessageSend} from '@/models/IMessage'

export enum SocketServerActions {
  Connect = 'connect',
  OnlineRoomList = 'online_room_list',
  UserConnectedToRoom = 'user_connected_to_room',
  UserDisconnected = 'user_disconnected',
  NewMessage = 'new_message',
  JoinToRoom = 'join_to_room',
  UserEndCall = 'user_end_call',
  UserDeclineCall = 'user_decline_call',
}

export enum SocketClientActions {
  Identity = 'identity',
  Join = 'join',
  Subscribe = 'subscribe',
  Message = 'message',
  CallEnd = 'call_end',
  CallDeclined = 'call_declined'
}

export interface ServerToClientEvents {
  [SocketServerActions.Connect]: () => void
  [SocketServerActions.OnlineRoomList]: (rooms: string[] | []) => void
  [SocketServerActions.UserConnectedToRoom]: (data: {userId: string, room: string}) => void
  [SocketServerActions.UserDisconnected]: (data: {userId: string, room: string}) => void
  [SocketServerActions.NewMessage]: (content: IMessage) => void
  [SocketServerActions.JoinToRoom]: (data: {room: string}) => void
  [SocketServerActions.UserEndCall]: (data: {room: string}) => void
  [SocketServerActions.UserDeclineCall]: (data: {room: string}) => void
}


export interface ClientToServerEvents {
  [SocketClientActions.Identity]: ({userId, clientId}: {userId: string, clientId: string}) => void
  [SocketClientActions.Join]: (rooms: string[]) => void
  [SocketClientActions.Subscribe]: (data: {room: string, otherUserId: string}) => void
  [SocketClientActions.Message]: (data: IMessageSend) => void
  [SocketClientActions.CallEnd]: (data: {room: string}) => void
  [SocketClientActions.CallDeclined]: (data: {room: string}) => void
}
