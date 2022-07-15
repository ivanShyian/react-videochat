import { IMessage } from './IMessage'
import { IUser } from './IUser'

export interface IChat {
  createdAt: Date
  id: string
  lastMessage: null | IMessage
  member: IUser
  isOnline?: boolean
}

export interface IChatsMap {
  [key: string]: IChat
}
