import { IChat } from '@/models/IChat';
import { IMapMessages, IMessage } from '@/models/IMessage';
import React, { FC, useEffect } from 'react';
import ChatBoxMessage from './ChatBoxMessage';

interface Props {
  messages: IMessage[]
  chat: IChat
  userId: string
  isCollapsed: boolean
}

export const ChatBox: FC<Props> = ({ messages, chat, userId, isCollapsed }) => {
  if (messages === undefined) {
    return <p>Loading...</p>
  }

  return (
    <div className={isCollapsed ? 'h-[calc(100%_-_497px)] mt-auto' : 'h-[calc(100%_-_57px)]'}>
      <div className={`chat__box flex flex-col pretty-scrollbar overflow-y-scroll h-full px-4 pb-2 ${isCollapsed ? 'pt-2' : 'pt-12'}`}>
        {messages.map((message, key) => (
          <ChatBoxMessage
            message={message}
            key={key}
            memberData={chat.member}
            isUserSender={message.sender_id === userId}
          />
        ))}
      </div>
    </div>
  )
}