import { useTypedSelector } from '@/use/useTypedSelector'
import React, {FC} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import TheSidebar from '../TheSidebar'
import { useChat, UseChatType } from '@/use/useChat'

const LayoutProtected: FC = () => {
  const {isAuth} = useTypedSelector(selector => selector.auth)
  useChat(UseChatType.Init)

  if (!isAuth) return <Navigate to="/login" />
  
  return (
    <div className="layout-default">
      <main className="main flex h-full bg-gradient-to-r from-slate-900 to-pink-800">
        <TheSidebar />
        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default LayoutProtected
