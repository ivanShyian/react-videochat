import { FC } from 'react';
import SButton from '@/components/Shared/SButton';
import { ReactComponent as IVoice } from '@/assets/icons/i-voice.svg'


export const ChatFooterVoice: FC = () => {
  return (
    <div className="chat__send mr-4 mt-0">
      <SButton
        theme="transparent"
        className="!p-0 !h-9 !w-12 rounded-lg rounded-l-none flex items-center justify-center border-none opacity-70 hover:!bg-white/10 hover:opacity-100"
        size="small"
      >
        <IVoice className="w-6 h-6 fill-current text-white mr-[0.1rem] mt-[0.1rem]" />
      </SButton>
    </div>
  )
}