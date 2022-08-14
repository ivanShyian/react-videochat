import {IUser} from '@/models/IUser'
import {IChat} from '@/models/IChat'
import {IMessage} from '@/models/IMessage'
import React, {FC, useEffect, useRef, useState} from 'react'
import ChatsChatHeader from '@/components/ChatsChat/ChatsChatHeader'
import ChatsChatBox from '@/components/ChatsChat/ChatsChatBox'
import ChatsChatFooter from '@/components/ChatsChat/ChatsChatFooter'

interface IChatChatBox {
  handleCall: () => void
  member: IUser | undefined
  chat: IChat
  messages: IMessage[]
  userId: string
  sendMessage: (message: string) => void
}

export const ChatsChatMessages: FC<IChatChatBox> = ({handleCall, member, messages, chat, userId, sendMessage}) => {

  return (
    <div className="chat w-full h-full">
      <div className="chat__wrapper relative md:rounded-xl overflow-hidden md:border border-white/20 h-full md:h-[calc(100%_-_40px)] w-full md:w-[calc(100%_-_20px)] m-0 md:m-5 md:ml-0">
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
          <ChatsChatFooter
            sendMessage={sendMessage}
          />
        </div>
        <div className="chat__bg absolute inset-0 before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg"/>
      </div>
    </div>
  )
}
