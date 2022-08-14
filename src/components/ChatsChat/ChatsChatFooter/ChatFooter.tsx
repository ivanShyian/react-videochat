import React, {FC, useState} from 'react'
import ChatFooterTextField from './ChatsChatFooterTextField';
import ChatFooterSend from './ChatsChatFooterSend';
import ChatFooterEmoji from '@/components/ChatsChat/ChatsChatFooter/ChatsChatFooterEmoji'

interface Props {
  sendMessage: (message: string) => void,
}

export const ChatFooter: FC<Props> = ({ sendMessage,  }) => {
  const [message, changeMessage] = useState('')
  const [emojiToInject, setEmojiToInject] = useState<string | null>(null)

  const sendMessageToUser = (textMessage: string): void => {
    const newMessage = textMessage.replace(/^(<br>)+|^(<div><br><\/div>)+|(<div><br><\/div>)+$/gm, '')
    if (newMessage.length) {
      sendMessage(textMessage.replace(/^(<br>)+|^(<div><br><\/div>)+|(<div><br><\/div>)+$/gm, ''))
    }
    changeMessage('')
  }

  return (
    <div
      className="chat__footer mt-auto flex items-center relative border-t border-white/20 px-2"
    >
      {/*<IClip />*/}
      <ChatFooterEmoji onEmoji={setEmojiToInject} />
      <ChatFooterTextField
        message={message}
        injectEmoji={emojiToInject}
        clearEmoji={() => setEmojiToInject(null)}
        onChange={changeMessage}
        sendMessage={() => sendMessageToUser(message)}
      />
      <ChatFooterSend
        sendMessage={() => sendMessageToUser(message)}
      />
      {/*<ChatsChatFooterVoice />*/}
    </div>
  )
}
