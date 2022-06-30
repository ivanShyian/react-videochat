import './index.css'
import React from 'react'
import Layout from '../Layout'
import { useTypedSelector } from '@/use/useTypedSelector'

function App() {
  const {isAuth} = useTypedSelector(state => state.auth)

  return (
    <div className="App">
      <Layout isAuth={isAuth} />
    </div>
  )
}

export default App
