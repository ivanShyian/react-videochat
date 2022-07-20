import React, {FC, useEffect, useState} from 'react'
import TheSidebarMembers from './TheSidebarMembers'
import TheSidebarSearch from './TheSidebarSearch'
import TheSidebarChats from './TheSidebarChats'
import {useParams} from 'react-router-dom'

export const TheSidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const params = useParams()

  useEffect(() => {
    if (document.documentElement.clientWidth <= 768) {
      setIsCollapsed(!!params.chatId)
    }
  }, [params])

  return (
    <aside className={`sidebar w-full h-full relative md:w-72 ${isCollapsed ? 'hidden' : 'block'}`}>
      <div className="sidebar__wrapper absolute top-5 bottom-5 left-5 border overflow-hidden border-white/20 rounded-xl w-[calc(100%_-_40px)]">
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
