import React, { FC  } from 'react';
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '@/use/useTypedSelector'
import { useChat, UseChatType } from '@/use/useChat';
import ChatHeader from './ChatHeader';
import ChatBox from './ChatBox';
import ChatFooter from './ChatFooter';

export const Chat: FC = () => {
  const {chatId} = useParams()
  const {messages} = useTypedSelector(selector => selector.messages)
  const {chats} = useTypedSelector(selector => selector.chats)
  const {user} = useTypedSelector(selector => selector.auth)
  const {currentChat, sendMessage} = useChat(UseChatType.Actions)

  return (
    <div className="chat w-full h-full">
      <div className="chat__wrapper relative rounded-xl border border-white/20 h-[calc(100%_-_40px)] w-[calc(100%_-_20px)] m-5 ml-0">
        <div className="chat__content relative z-10 flex flex-col justify-between h-full">
          <ChatHeader nickname={currentChat?.member?.nickname} />
          <ChatBox
            messages={messages[chatId as string]}
            chat={chats[chatId as string]}
            userId={user.id}
          />
          <ChatFooter sendMessage={sendMessage} />
        </div>
        <div className="chat__bg absolute inset-0 before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg" />
      </div>
    </div>
  )
}