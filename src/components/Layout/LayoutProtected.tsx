import { useTypedSelector } from '@/use/useTypedSelector'
import React, {FC, useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import TheSidebar from '../TheSidebar'
import { useChat, UseChatType } from '@/use/useChat'
import { PeerContextProvider } from '../../context/PeerContext'
import ChatAnswerModal from '../Chat/ChatAnswerModal'

const LayoutProtected: FC = () => {
  const {isAuth} = useTypedSelector(selector => selector.auth)
  useChat(UseChatType.Init)

  if (!isAuth) return <Navigate to="/login" />
  
  return (
    <PeerContextProvider>
      <div className="layout-default">
      <main className="main flex h-full bg-gradient-to-r from-slate-900 to-pink-800">
        <TheSidebar />
        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
        <ChatAnswerModal />
      </main>
      </div>
    </PeerContextProvider>
  )
}

export default LayoutProtected
