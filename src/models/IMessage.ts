export interface IMapMessages {
  [key: string]: IMessage[]
}

export interface IMessage {
  id: number
  content: string
  chatroom_id: string
  receiver_id: string
  sender_id: string
  createdAt: null | Date
  readAt: null | Date
  updatedAt: Date | string | null
}

export interface IMessageSend {
  room: string
  senderId: string
  receiverId: string
  message: string
}
