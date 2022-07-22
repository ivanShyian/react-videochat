import SButton from '@/components/shared/SButton';
import { FC } from 'react';
import { ReactComponent as ICall } from '@/assets/icons/i-videocall.svg'
import { ReactComponent as IEquals } from '@/assets/icons/i-equals.svg'
import {useNavigate} from 'react-router-dom'

interface Props {
  nickname: string
  onCall: () => any
}

export const ChatsChatHeader: FC<Props> = ({nickname, onCall}) => {
  const navigate = useNavigate()

  return (
    <div className="chat__header h-10 min-h-[2.5rem] flex justify-center absolute left-0 right-0">
      <div className="chat__header_wrapper border-b relative z-10 border-white/20 w-full md:rounded-t-xl px-4 overflow-hidden backdrop-blur-xl h-full before:bg-black/0 before:absolute before:inset-0 before:z-0 before:blur-xl">
        <div className="chat__header_content z-10 relative h-full flex items-center justify-between">
          <SButton
            theme="transparent"
            className="border-0 !p-0 !p-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 md:hidden"
            onClick={() => navigate('/chats')}
          >
            <IEquals className="fill-current text-white" />
          </SButton>
          <span className="text-blue-200 text-md">{nickname}</span>
          <SButton
            theme="transparent"
            onClick={onCall}
            className="!p-0 !p-2 !border-0 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10"
          >
            <ICall className="fill-current text-white" />
          </SButton>
        </div>
      </div>
    </div>
  )
}
