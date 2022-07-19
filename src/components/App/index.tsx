import './index.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import LayoutLogin from '../layout/LayoutLogin'
import LayoutProtected from '../layout/LayoutProtected'
import Chats from '../pages/Chats'
import ChatsChat from '../pages/ChatsChat'

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
