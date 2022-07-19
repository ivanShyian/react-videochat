import { IMessage } from './IMessage'
import { IUser } from './IUser'
import {MediaConnection} from 'peerjs'

export interface IChat {
  createdAt: Date
  id: string
  lastMessage: null | IMessage
  member: IUser
  isOnline?: boolean
  callData?: IChatCall
}

export interface IChatsMap {
  [key: string]: IChat
}

export interface IChatCall {
  type: 'receiver' | 'caller'
  receiverId?: string
  callerId?: string
  userVideoStream?: MediaStream
  myVideoStream?: MediaStream
  call?: MediaConnection
}
