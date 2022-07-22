import { IChat } from '@/models/IChat';
import { IMessage } from '@/models/IMessage';
import React, {FC, useEffect, useRef, useState} from 'react'
import ChatsChatBoxMessage from '@/components/ChatsChat/ChatsChatBox/ChatsChatBoxMessage'
import SLoader from '@/components/shared/SLoader'

interface Props {
  messages: IMessage[]
  chat: IChat
  userId: string
}

export const ChatsChatBox: FC<Props> = ({ messages, chat, userId }) => {
  const bottomOfMessages = useRef<HTMLDivElement>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (chat && chat.id && bottomOfMessages.current) {
      bottomOfMessages.current.scrollIntoView()
      setLoading(false)
    }
  }, [chat, bottomOfMessages.current])

  if (messages === undefined) {
    return <p>Loading...</p>
  }

  return (
    <div className="h-[calc(100%_-_57px)] relative">
      {isLoading && <SLoader className="!absolute h-full w-full" />}
      <div className={`chat__box flex flex-col pretty-scrollbar overflow-y-scroll relative overflow-x-hidden h-full px-4 pb-2 transition ease-in-out pt-12 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {messages.map((message, key) => (
          <ChatsChatBoxMessage
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
