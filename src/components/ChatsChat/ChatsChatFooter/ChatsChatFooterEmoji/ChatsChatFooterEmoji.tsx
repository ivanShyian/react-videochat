import React, { FC } from 'react';
import { ReactComponent as IEmoji } from '@/assets/icons/i-emoji.svg'
import SButton from '@/components/shared/SButton';

export const ChatFooterEmoji: FC = () => {
  return (
    <div className="chat__emoji">
      <SButton
        theme="transparent"
        className="!p-0 !h-9 -mr-2 !w-12 rounded-lg flex items-center justify-center border-none opacity-70 hover:!bg-white/10 hover:opacity-100"
        size="small"
      >
        <IEmoji className="w-6 h-6 stroke-current text-white mr-[0.1rem] mt-[0.1rem]" />
      </SButton>
    </div>
  )
}
