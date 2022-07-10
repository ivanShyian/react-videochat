import { FC } from 'react';
import { useTypedSelector } from '@/use/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ISpinner } from '@/assets/icons/i-spinner.svg'
import moment from 'moment'

export const TheSidebarChats: FC = () => {
  const { chats, isLoading } = useTypedSelector(selector => selector.chats)
  const navigate = useNavigate()

  if (!Object.keys(chats).length && isLoading) {
    return (
      <p className="flex justify-center items-center text-center text-md border-b border-white/20 relative h-[53px]">
        <ISpinner className="animate-spin h-4 text-white/20 fill-red-400 mr-2" />
        <span className="text-white/20">Loading...</span>
      </p>
    )
  }

  return (
    <section className="sidebar__chats relative z-10">
      <ul className="sidebar__chats_list">
        {Object.keys(chats).map((chatKey, id) => {
          const chat = chats[chatKey]
          return (
            <li
              key={id}
              className="sidebar__chats_item px-4 border-b pb-2 border-white/20 cursor-pointer hover:bg-white/5"
              onClick={() => navigate(`/chats/${chat.id}`)}
            >
              <p className="text-lg text-blue-200 block">{chat.member.nickname}</p>
              <p className="flex justify-between items-end text-sm -mt-1 whitespace-nowrap overflow-hidden text-ellipsis text-white/60">
                {
                  chat.lastMessage
                    ? (
                      <>
                        <span className="overflow-hidden text-ellipsis">{chat.lastMessage?.content}</span>
                        <span className="text-xs">{moment(chat.lastMessage?.updatedAt).format('HH:mm')}</span>
                      </>
                    )
                    : <span className="text-white/20">No messages yet</span>
                }
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}