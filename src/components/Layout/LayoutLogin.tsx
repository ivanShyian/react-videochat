import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useTypedSelector } from '@/use/useTypedSelector'

const LayoutLogin = () => {
  const {isAuth} = useTypedSelector(selector => selector.auth)

  if (isAuth) {
    return <Navigate to="/chats" />
  }

  return (
    <main className="main bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center layout-login login">
      <div className='card card__login flex relative' style={{height: '476px', width: '750px'}}>
        <div className="card__image bg-background-login bg-no-repeat bg-contain h-72 w-72 mr-auto" />
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutLogin
