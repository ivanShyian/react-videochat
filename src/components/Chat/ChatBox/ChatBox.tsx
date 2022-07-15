import { IChat } from '@/models/IChat';
import { IMessage } from '@/models/IMessage';
import React, {FC, useEffect, useRef} from 'react'
import ChatBoxMessage from './ChatBoxMessage';

interface Props {
  messages: IMessage[]
  chat: IChat
  userId: string
}

export const ChatBox: FC<Props> = ({ messages, chat, userId }) => {
  const bottomOfMessages = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chat && chat.id && bottomOfMessages.current) {
      bottomOfMessages.current.scrollIntoView()
    }
  }, [chat, bottomOfMessages.current])

  if (messages === undefined) {
    return <p>Loading...</p>
  }

  return (
    <div className="h-[calc(100%_-_57px)]">
      <div className="chat__box flex flex-col pretty-scrollbar overflow-y-scroll h-full px-4 pb-2 pt-12"
      >
        {messages.map((message, key) => (
          <ChatBoxMessage
            message={message}
            key={key}
            memberData={chat.member}
            isUserSender={message.sender_id === userId}
          />
        ))}
        <div ref={bottomOfMessages} />
      </div>
    </div>
  )
}
