import React, {FC, LegacyRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useTypedSelector} from '@/use/useTypedSelector'
import {useChat, UseChatType} from '@/use/useChat'
import ChatHeader from '../../Chat/ChatHeader'
import ChatBox from '../../Chat/ChatBox'
import ChatFooter from '../../Chat/ChatFooter'
import {usePeerContext} from '../../../context/PeerContext'
import {IUser} from '@/models/IUser'
import {IChat} from '@/models/IChat'
import {IMessage} from '@/models/IMessage'

export const ChatsChat: FC = () => {
  const {chatId} = useParams()
  const {messages} = useTypedSelector(selector => selector.messages)
  const {chats} = useTypedSelector(selector => selector.chats)
  const {user} = useTypedSelector(selector => selector.auth)
  const {currentChat, sendMessage} = useChat(UseChatType.Actions)
  const {
    onCallUser,
    videoRefMember,
    videoRef,
    isCallView
  } = usePeerContext()

  const handleCall = () => {
    if (currentChat.member) {
      onCallUser(currentChat.id, currentChat.member.id)
    }
  }

  if (!isCallView) {
    return (
      <ChatChatBox
        handleCall={handleCall}
        member={currentChat.member}
        chat={chats[chatId as string]}
        messages={messages[chatId as string]}
        userId={user.id}
        sendMessage={sendMessage}
      />
    )
  }
  return (
    <ChatChatCall
      videoRefMember={videoRefMember}
      videoRef={videoRef}
    />
  )
}

interface IChatChatBox {
  handleCall: () => void
  member: IUser
  chat: IChat
  messages: IMessage[]
  userId: string
  sendMessage: (message: string) => void
}

const ChatChatBox: FC<IChatChatBox> = ({handleCall, member, messages, chat, userId, sendMessage}) => {
  return (
    <div className="chat w-full h-full">
      <div
        className="chat__wrapper relative rounded-xl overflow-hidden border border-white/20 h-[calc(100%_-_40px)] w-[calc(100%_-_20px)] m-5 ml-0">
        <div className="chat__content relative z-10 flex flex-col justify-between h-full">
          <ChatHeader
            onCall={handleCall}
            nickname={member?.nickname}
          />
          <ChatBox
            messages={messages}
            chat={chat}
            userId={userId}
          />
          <ChatFooter sendMessage={sendMessage}/>
        </div>
        <div
          className="chat__bg absolute inset-0 before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg"/>
      </div>
    </div>
  )
}

interface IChatChatCall {
  videoRefMember: LegacyRef<HTMLVideoElement>
  videoRef: LegacyRef<HTMLVideoElement>
}

const ChatChatCall: FC<IChatChatCall> = ({videoRefMember, videoRef}) => {
  return (
    <div className="chats-call mr-5 my-5 w-full h-[calc(100%_-_40px)] flex flex-col">
      <div className="chat-call__wrapper h-[calc(100%_-_80px)] flex flex-col xl:flex-row">
        <div className="chat-call__video mb-5 flex-1 h-[calc(50%_-_10px)] block xl:block xl:h-max xl:my-auto xl:mr-5">
          <video
            className="rounded-xl overflow-hidden mx-auto w-auto h-full xl:w-full xl:h-auto"
            // src={'http://www.w3schools.com/html/mov_bbb.mp4'}
            ref={videoRefMember}
          />
        </div>
        <div className="chat-call__video flex-1 h-[calc(50%_-_10px)] block xl:block xl:h-max xl:my-auto">
          <video
            className="rounded-xl overflow-hidden mx-auto w-auto h-full xl:w-full xl:h-auto"
            // src={'http://www.w3schools.com/html/mov_bbb.mp4'}
            ref={videoRef}
          />
        </div>
      </div>
      <div className="h-[calc(80px_-_20px)] mt-5 flex items-center rounded-xl border border-white/20 relative overflow-hidden justify-center before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg">
        <p>()</p>
        <p>()</p>
        <p>()</p>
      </div>
    </div>
  )
}

