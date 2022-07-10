import React, { FC } from 'react'
import TheSidebarMembers from './TheSidebarMembers'
import TheSidebarSearch from './TheSidebarSearch'
import TheSidebarChats from './TheSidebarChats'

export const TheSidebar: FC = () => {
  return (
    <aside className="sidebar w-72 h-full relative">
      <div className="sidebar__wrapper absolute top-5 bottom-5 left-5 border border-white/20 rounded-xl overflow-hidden w-[calc(100%_-_40px)]">
        <div className="relative z-10">
          <TheSidebarSearch />
          <TheSidebarMembers />
          <TheSidebarChats />
        </div>
        <div className="sidebar__bg before:bg-black/20 before:absolute before:inset-0 before:z-0 before:blur-lg" />
      </div>
    </aside>
  )
}