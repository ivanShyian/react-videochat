import React, { FC } from 'react';
import SButton from '@/components/Shared/SButton';
import { ReactComponent as ISend } from '@/assets/icons/i-send.svg'

interface Props {
  message: string
  sendMessage: (message: string) => void
}

export const ChatsChatFooterSend: FC<Props> = ({ message, sendMessage }) => {
  return (
    <div className="chat__send mt-0">
      <SButton
        theme="transparent"
        className="!p-0 !h-9 !w-12 rounded-xl rounded-r-none flex items-center justify-center border-none opacity-70 hover:!bg-white/10 hover:opacity-100"
        size="small"
        onClick={() => sendMessage(message)}
      >
        <ISend className="w-6 h-6 fill-current text-white mr-[0.1rem] mt-[0.1rem]" />
      </SButton>
    </div>
  )
}
