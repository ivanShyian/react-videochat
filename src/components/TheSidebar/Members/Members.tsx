import { FC } from 'react';
import { IUser } from '../../../models/IUser';
import {useTypedSelector} from '../../../use/useTypedSelector'

export const TheSidebarMembers: FC = () => {
  const {
    users: foundUsers,
    query,
    isLoading
  }: {users: IUser[], query: string, isLoading: boolean} = useTypedSelector(selector => selector.users)

  const showNotFoundMessage = query.length > 1 && !foundUsers.length && !isLoading

  return (
    <section className="sidebar__members">
        <ul className="sidebar__members_list">
          {foundUsers.map((u: IUser) => {
            return (
              <li
                key={u.id}
                className="sidebar__members_item text-yellow-200 text-xl text-center py-2 border-b-2 border-yellow-200 cursor-pointer hover:bg-slate-700"
              >
                <span>{u.nickname}</span>
              </li>
            )
          })}
          {showNotFoundMessage && (
            <li className="text-red-500 text-center text-xl py-2">Cannot find users whith given query &#129313;</li>
          )}
        </ul>
      </section>
  )
}