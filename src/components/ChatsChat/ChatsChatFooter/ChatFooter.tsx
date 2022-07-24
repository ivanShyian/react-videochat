import React, {FC, LegacyRef, MutableRefObject, RefObject, useEffect, useRef, useState} from 'react'
import ChatFooterTextField from './ChatsChatFooterTextField';
import ChatFooterSend from './ChatsChatFooterSend';

interface Props {
  sendMessage: (message: string) => void,
}

export const ChatFooter: FC<Props> = ({ sendMessage,  }) => {
  const [message, changeMessage] = useState('')

  const sendMessageToUser = (textMessage: string): void => {
    const newMessage = textMessage.replace(/^(<br>)+|^(<div><br><\/div>)+|(<div><br><\/div>)+$/gm, '')
    if (newMessage.length) {
      sendMessage(textMessage.replace(/^(<br>)+|^(<div><br><\/div>)+|(<div><br><\/div>)+$/gm, ''))
    }
    changeMessage('')
  }

  return (
    <div
      className="chat__footer mt-auto overflow-hidden flex items-center relative border-t border-white/20 px-2"
    >
      {/*<ChatFooterEmoji />*/}
      <ChatFooterTextField
        message={message}
        onChange={changeMessage}
        sendMessage={() => sendMessageToUser(message)}
      />
      <ChatFooterSend
        sendMessage={() => sendMessageToUser(message)}
      />
      {/* <div>
        <IClip />
      </div> */}
      {/*<ChatsChatFooterVoice />*/}
    </div>
  )
}
