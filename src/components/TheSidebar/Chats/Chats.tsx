import { FC } from 'react';
import { useTypedSelector } from '@/use/useTypedSelector'

export const TheSidebarChats: FC = () => {
  const {chats} = useTypedSelector(selector => selector.chats)

  return (
    <section className="sidebar__chats">
      <ul className="sidebar__chats_list">
        { [].map((chat, id) => {
          return (
            <li
              key={id}
              className="sidebar__chats_item"
            >
              chat here
            </li>
          )
        }) }
      </ul>
    </section>
  )
}