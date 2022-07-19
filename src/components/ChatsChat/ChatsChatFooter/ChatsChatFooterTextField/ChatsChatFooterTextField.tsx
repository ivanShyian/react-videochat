import SInput from '@/components/Shared/SInput';
import keyDownHandler from '@/utils/keyDownHandler';
import React, { FC, Dispatch, SetStateAction, KeyboardEvent, useState, useRef, Component, RefObject, MutableRefObject } from 'react';

interface Props {
  message: string
  onChange: Dispatch<SetStateAction<string>>
  sendMessage: (message: string) => void
}

export const ChatsChatFooterTextField: FC<Props> = ({ message, onChange, sendMessage }) => {
  const [collapsed, changeCollapse] = useState(true)
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // const target = e.target as HTMLTextAreaElement
    // target.style.height = target.scrollHeight + 'px'
    const key = keyDownHandler(e)
    const isEnter = key == 13 || key === 'Enter'
    if (isEnter && !e.shiftKey) {
      e.preventDefault()
      sendMessage(message)
    } else if (isEnter) {
    }
  }

 
  return (
    <div className="chat__input h-14 flex-1">
      <SInput
        id="chat__message"
        className="!h-full pt-4 pb-4"
        type="textarea"
        inputClassName="!bg-transparent text-white overflow-hidden h-full max-h-64 transition ease-in-out"
        placeholder="Write message here..."
        value={message}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
