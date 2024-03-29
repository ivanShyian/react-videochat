import { IMessage } from '@/models/IMessage';
import React, { FC } from 'react';
import { IUser } from '@/models/IUser';
import ChatsChatBoxMessageTime from './ChatsChatBoxMessageTime';

interface Props {
  message: IMessage
  memberData: IUser
  isUserSender: boolean 
}

export const ChatsChatBoxMessage: FC<Props> = ({ message, memberData, isUserSender }) => {
  return (
    <div className={`chat-box-message first:mt-auto pt-1 ${isUserSender ? 'flex justify-end' : ''}`}>
      <div className={`chat-box-message__wrapper max-w-[70%] md:max-w-[40%] inline-flex items-end ${isUserSender ? 'bg-[#30122a]/30' : 'bg-[#7a123d]/30'} px-4 pb-1 rounded-lg text-white`}>
        <p className="chat-box-message__content break-words inline-block break-all" dangerouslySetInnerHTML={{__html: message.content}}/>
        <ChatsChatBoxMessageTime createdAt={message.createdAt} />
      </div>
    </div>
  )
}
