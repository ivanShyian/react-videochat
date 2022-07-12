import React, { FC, useState } from 'react';
import ChatFooterTextField from './ChatFooterTextField';
import ChatFooterEmoji from './ChatFooterEmoji';
import ChatFooterSend from './ChatFooterSend';
import { ChatFooterVoice } from './ChatFooterVoice/ChatFooterVoice';
import { ReactComponent as IClip } from '@/assets/icons/i-clip.svg'

export const ChatFooter: FC<{sendMessage: (message: string) => void}> = ({ sendMessage }) => {
  const [message, changeMessage] = useState('')

  const sendMessageToUser = (textMessage: string): void => {
    sendMessage(textMessage)
    changeMessage('')
  }

  return (
    <div className="chat__footer flex items-center relative border-t border-white/20">
      <ChatFooterEmoji />
      <ChatFooterTextField
        message={message}
        onChange={changeMessage}
        sendMessage={() => sendMessageToUser(message)}
      />
      <ChatFooterSend
        message={message}
        sendMessage={() => sendMessageToUser(message)}
      />
      {/* <div>
        <IClip />
      </div> */}
      <ChatFooterVoice />
    </div>
  )
}