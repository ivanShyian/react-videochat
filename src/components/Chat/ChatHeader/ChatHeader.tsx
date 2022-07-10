import SButton from '@/components/Shared/SButton';
import { FC } from 'react';
import { ReactComponent as ICall } from '@/assets/icons/i-videocall.svg'

export const ChatHeader: FC<{nickname: string}> = ({nickname}) => {
  return (
    <div className="chat__header h-10 flex justify-center absolute left-0 right-0">
      <div className="chat__header_wrapper border border-t-0 relative border-white/20 w-64 pl-4 pr-2 h-full rounded-b-xl before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg">
        <div className="chat__header_content z-10 relative h-full flex items-center justify-between">
          <span className="text-blue-200 text-md">{nickname}</span>
          <SButton theme="transparent" className="!p-0 !px-2 !border-0 !h-7 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10">
            <ICall className="fill-current text-white w-full h-full" />
          </SButton>
        </div>
      </div>
    </div>
  )
}