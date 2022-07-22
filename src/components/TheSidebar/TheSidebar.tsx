import React, {FC, useEffect, useRef, useState} from 'react'
import TheSidebarMembers from './TheSidebarMembers'
import TheSidebarSearch from './TheSidebarSearch'
import TheSidebarChats from './TheSidebarChats'
import {useParams} from 'react-router-dom'

export const TheSidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const aside = useRef<HTMLDivElement | null>(null)
  const params = useParams()

  useEffect(() => {
    if (document.documentElement.clientWidth <= 768) {
      if (params.chatId) {
        aside.current?.classList.remove('!block')
        aside.current?.classList.add('hidden')
      } else {
        aside.current?.classList.add('!block')
      }
    }
  }, [params])

  return (
    <aside
      ref={aside}
      className="sidebar w-full h-full relative md:w-72 hidden md:block"
    >
      <div className="sidebar__wrapper absolute inset-0 md:top-5 md:bottom-5 md:left-5 md:border overflow-hidden border-white/20 md:rounded-xl w-full md:w-[calc(100%_-_40px)]">
        <div className="relative z-10 h-full">
          <TheSidebarSearch />
          <div className="h-full overflow-y-auto pretty-scrollbar pb-8">
            <TheSidebarMembers />
            <TheSidebarChats />
          </div>
        </div>
        <div className="sidebar__bg blurred-bg before:z-0 !static" />
      </div>
    </aside>
  )
}
