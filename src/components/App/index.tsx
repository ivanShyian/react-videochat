import './index.css'
import React, {useState} from 'react'
import Layout from '../Layout'

function App() {
  const [isAuth, changeIsAuth] = useState(!!localStorage.getItem('auth'))

  return (
    <div className="App">
      <Layout isAuth={isAuth} />
    </div>
  )
}

export default App
