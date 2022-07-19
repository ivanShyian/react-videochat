import SButton from '@/components/Shared/SButton';
import { FC } from 'react';
import { ReactComponent as ICall } from '@/assets/icons/i-videocall.svg'

interface Props {
  nickname: string
  onCall: () => any
}

export const ChatsChatHeader: FC<Props> = ({nickname, onCall}) => {
  return (
    <div className="chat__header h-10 flex justify-center absolute left-0 right-0">
      <div className="chat__header_wrapper border-b relative z-10 border-white/20 w-full px-4 overflow-hidden backdrop-blur-xl h-full before:bg-black/0 before:absolute before:inset-0 before:z-0 before:blur-xl">
        <div className="chat__header_content z-10 relative h-full flex items-center justify-between">
          <span className="text-blue-200 text-md">{nickname}</span>
          <SButton
            theme="transparent"
            onClick={onCall}
            className="!p-0 !px-2 !border-0 !h-7 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10"
          >
            <ICall className="fill-current text-white w-full h-full" />
          </SButton>
        </div>
      </div>
    </div>
  )
}
