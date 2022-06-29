import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Login from '../Login'
import Registration from '../Registration'

const LayoutLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login')
    }
  }, [location])

  return (
    <main className="main bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center layout-login login">
      <div className='card card__login flex relative' style={{height: '476px', width: '750px'}}>
        <div className="card__image bg-background-login bg-no-repeat bg-contain h-72 w-72 mr-auto" />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </div>
    </main>
  )
}

export default LayoutLogin
