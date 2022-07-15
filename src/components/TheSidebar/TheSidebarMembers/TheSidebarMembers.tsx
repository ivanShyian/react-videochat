import { FC, useMemo } from 'react';
import { IUser } from '@/models/IUser';
import {useTypedSelector} from '@/use/useTypedSelector'
import { UsersState } from '@/store/reducers/users/types';
import { useChat, UseChatType } from '@/use/useChat';

export const TheSidebarMembers: FC = () => {
  const {onMemberClick} = useChat(UseChatType.Actions)
  const { users: foundUsers, query }: UsersState = useTypedSelector(selector => selector.users)
  const showNotFoundMessage = useMemo(() => query.length > 1 && !foundUsers.length, [query, foundUsers])

  return (
    <section className="sidebar__members relative z-0">
        <ul className="sidebar__members_list">
          {foundUsers.map((u: IUser) => {
            return (
              <li
                key={u.id}
                className="sidebar__members_item flex items-center justify-between text-yellow-200 text-xl h-12 px-2 border-b border-white/20 hover:bg-white/5 cursor-pointer relative z-10"
                onClick={() => onMemberClick(u.id)}
              >
                <div className="h-full">
                  <span className="block ml-2 -mb-2">{u.nickname}</span>
                  <span className="block ml-4 text-sm">{u.email}</span>
                </div>
              </li>
            )
          })}
          <li
            className={`text-center text-red-300 text-md px-4 flex items-center relative z-0 border-b border-white/20
            ${showNotFoundMessage ? 'h-16 opacity-100' : 'h-0 opacity-0'} transition-all ease-in-out`}
          >Cannot find users with given query &#129313;</li>
        </ul>
      </section>
  )
}
