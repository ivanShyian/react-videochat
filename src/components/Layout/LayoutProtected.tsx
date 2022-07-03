import { useActions } from '@/use/useActions'
import { useTypedSelector } from '@/use/useTypedSelector'
import React, {useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ChatsActionCreators } from '../../store/reducers/chats/action-creators'
import TheSidebar from '../TheSidebar'

const LayoutProtected = () => {
  const {isAuth} = useTypedSelector(selector => selector.auth)
  const {getChats} = useActions(ChatsActionCreators.getChats)

  if (!isAuth) return <Navigate to="/login" />
  
  useEffect(() => {
    getChats()
  }, [])

  return (
    <div className="layout-default">
      <main className="main flex h-full">
        <TheSidebar />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default LayoutProtected
