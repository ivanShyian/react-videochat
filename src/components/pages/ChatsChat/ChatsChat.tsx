import React, { FC  } from 'react';
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '@/use/useTypedSelector'
import { useChat, UseChatType } from '@/use/useChat';
import ChatHeader from '../../Chat/ChatHeader';
import ChatBox from '../../Chat/ChatBox';
import ChatFooter from '../../Chat/ChatFooter';
import { useCall } from '@/use/useCall';

export const ChatsChat: FC = () => {
  const {chatId} = useParams()
  const {messages} = useTypedSelector(selector => selector.messages)
  const {chats} = useTypedSelector(selector => selector.chats)
  const {user} = useTypedSelector(selector => selector.auth)
  const {currentChat, sendMessage } = useChat(UseChatType.Actions)
  const {
    onCallUser,
    videoRef,
    videoRefMember,
    callStarted
  } = useCall()

  const handleCall = () => {
    if (currentChat.member) {
      onCallUser(currentChat.id, currentChat.member.id)
    }
  }

  return (
    <div className="chat w-full h-full">
      <div className="chat__wrapper relative rounded-xl overflow-hidden border border-white/20 h-[calc(100%_-_40px)] w-[calc(100%_-_20px)] m-5 ml-0">
        <div className="chat__content relative z-10 flex flex-col justify-between h-full">
          <ChatHeader
            onCall={handleCall}
            nickname={currentChat?.member?.nickname}
          />
          <ChatBox
            messages={messages[chatId as string]}
            chat={chats[chatId as string]}
            userId={user.id}
            isCollapsed={callStarted}
          />
          <ChatFooter sendMessage={sendMessage} />
          <div className={`absolute top-10 left-0 right-0 z-10 ${callStarted ?`min-h-[400px] max-h-[400px] border-b border-white/20` : 'min-h-[0px] h-0'} flex justify-evenly bg-black/20`}>
            <video className="flex-1" ref={videoRefMember} />
            <div className="w-[1px] bg-white/20" />
            <video className="flex-1" ref={videoRef} />
          </div>
        </div>
        <div className="chat__bg absolute inset-0 before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg" />
      </div>
    </div>
  )
}