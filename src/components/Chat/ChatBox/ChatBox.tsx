import { IChat } from '@/models/IChat';
import { IMapMessages, IMessage } from '@/models/IMessage';
import React, { FC, useEffect } from 'react';
import ChatBoxMessage from './ChatBoxMessage';

interface Props {
  messages: IMessage[]
  chat: IChat
  userId: string
}

export const ChatBox: FC<Props> = ({ messages, chat, userId }) => {
  if (messages === undefined) {
    return <p>Loading...</p>
  }

  return (
    <div className="chat__box flex flex-col justify-end flex-1 px-4 py-2">
      {messages.map((message, key) => (
        <ChatBoxMessage
          message={message}
          key={key}
          memberData={chat.member}
          isUserSender={message.sender_id === userId}
        />
      ))}
    </div>
  )
}