import {IUser} from '@/models/IUser'
import {IChat} from '@/models/IChat'
import {IMessage} from '@/models/IMessage'
import React, {FC} from 'react'
import ChatsChatHeader from '@/components/ChatsChat/ChatsChatHeader'
import ChatsChatBox from '@/components/ChatsChat/ChatsChatBox'
import ChatsChatFooter from '@/components/ChatsChat/ChatsChatFooter'

interface IChatChatBox {
  handleCall: () => void
  member: IUser
  chat: IChat
  messages: IMessage[]
  userId: string
  sendMessage: (message: string) => void
}

export const ChatsChatMessages: FC<IChatChatBox> = ({handleCall, member, messages, chat, userId, sendMessage}) => {
  return (
    <div className="chat w-full h-full">
      <div className="chat__wrapper relative rounded-xl overflow-hidden border border-white/20 h-[calc(100%_-_40px)] w-[calc(100%_-_40px)] md:w-[calc(100%_-_20px)] m-5 ml-5 md:ml-0">
        <div className="chat__content relative z-10 flex flex-col justify-between h-full">
          <ChatsChatHeader
            onCall={handleCall}
            nickname={member?.nickname}
          />
          <ChatsChatBox
            messages={messages}
            chat={chat}
            userId={userId}
          />
          <ChatsChatFooter sendMessage={sendMessage}/>
        </div>
        <div
          className="chat__bg absolute inset-0 before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg"/>
      </div>
    </div>
  )
}
