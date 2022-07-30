import keyDownHandler from '@/utils/keyDownHandler';
import React, {
  FC,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useRef,
  FormEvent, useEffect, useMemo
} from 'react'

interface Props {
  message: string
  onChange: Dispatch<SetStateAction<string>>
  sendMessage: (message: string) => void
  injectEmoji: string | null
  clearEmoji: () => void
}

export const ChatsChatFooterTextField: FC<Props> = ({ message, onChange, sendMessage, injectEmoji, clearEmoji }) => {
  const contentEditable = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (message.length === 0 && contentEditable.current) {
      contentEditable.current.innerHTML = message
    }
  }, [message])

  useEffect(() => {
    if (contentEditable.current && injectEmoji) {
      contentEditable.current.innerHTML += injectEmoji
      onChange((message) => message + injectEmoji)
      clearEmoji()
    }
  }, [injectEmoji])

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = keyDownHandler(e)
    const divTarget = e.target as HTMLDivElement
    const isEnter = key == 13 || key === 'Enter'
    if (isEnter && !e.shiftKey) {
      e.preventDefault()
      sendMessage(divTarget.innerHTML)
    }
  }

  const onInput = (event: FormEvent<HTMLDivElement>) => {
    const divTarget = event.target as HTMLDivElement
    onChange(divTarget.innerHTML)
    console.log(message)
  }
 
  return (
    <div className="chat__input w-full max-h-[196px] mx-2 flex items-center">
      <div
        ref={contentEditable}
        className="chat__message text-white min-h-[24px] h-full max-h-[176px] py-1 px-2 my-2 w-full break-all overflow-y-auto pretty-scrollbar-white focus:outline rounded-md outline-white/20"
        placeholder="Write your message here..."
        contentEditable
        onInput={onInput}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
