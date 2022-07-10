import React, { FC, useState } from 'react';
import ChatFooterTextField from './ChatFooterTextField';
import ChatFooterEmoji from './ChatFooterEmoji';
import ChatFooterSend from './ChatFooterSend';
import { ChatFooterVoice } from './ChatFooterVoice/ChatFooterVoice';
import { useParams } from 'react-router-dom';
import { ReactComponent as IClip } from '@/assets/icons/i-clip.svg'

export const ChatFooter: FC<{sendMessage: (message: string) => void}> = ({ sendMessage }) => {
  const {chatId} = useParams()
  const [message, changeMessage] = useState('')

  return (
    <div className="chat__footer flex items-center relative border-t border-white/20">
      <ChatFooterEmoji />
      <ChatFooterTextField
        message={message}
        onChange={changeMessage}
        sendMessage={() => sendMessage(message)}
      />
      <ChatFooterSend
        message={message}
        sendMessage={() => sendMessage(message)}
      />
      {/* <div>
        <IClip />
      </div> */}
      <ChatFooterVoice />
    </div>
  )
}