import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useTypedSelector } from '@/use/useTypedSelector'
import {ToastContainer} from 'react-toastify'

export const LayoutLogin = () => {
  const {isAuth} = useTypedSelector(selector => selector.auth)

  if (isAuth) {
    return <Navigate to="/chats" />
  }


  return (
    <main className="main bg-slate-to-pink h-screen flex justify-center items-center layout-login login">
      <div className="card card__login flex relative md:h-[476px] md:w-[750px]">
        <div className="hidden md:block card__image bg-background-login bg-no-repeat bg-contain h-72 w-72 mr-auto" />
        <Outlet />
      </div>
    </main>
  )
}

