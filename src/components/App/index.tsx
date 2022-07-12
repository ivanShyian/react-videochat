import './index.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from '../Pages/Login'
import Registration from '../Pages/Registration'
import LayoutLogin from '../Layout/LayoutLogin'
import LayoutProtected from '../Layout/LayoutProtected'
import Chats from '../Pages/Chats'
import ChatsChat from '../Pages/ChatsChat'

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
