import React, { FC } from 'react'
import TheSidebarMembers from './Members'
import TheSidebarSearch from './Search'
import TheSidebarChats from './Chats'

export const TheSidebar: FC = () => {
  return (
    <aside className="sidebar w-72 border-r-2 bg-slate-800 h-full">
      <TheSidebarSearch />
      <TheSidebarMembers />
      <TheSidebarChats />
    </aside>
  )
}