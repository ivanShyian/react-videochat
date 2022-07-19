import './index.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from '@/components/pages/Login'
import Registration from '@/components/pages/Registration'
import LayoutLogin from '@/components/Layout/LayoutLogin'
import LayoutProtected from '@/components/Layout/LayoutProtected'
import Chats from '@/components/pages/Chats'
import ChatsChat from '@/components/pages/ChatsChat'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutLogin />}>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        <Route path='/chats' element={<LayoutProtected />}>
          <Route path='/chats' element={<Chats />} />
          <Route path='/chats/:chatId' element={<ChatsChat />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
