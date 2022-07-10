import './index.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from '../Pages/Login'
import Registration from '../Pages/Registration'
import LayoutLogin from '../Layout/LayoutLogin'
import LayoutProtected from '../Layout/LayoutProtected'
import ChatEmpty from '../Chat/ChatEmpty'
import Chat from '../Chat'

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
          <Route path='/chats' element={<ChatEmpty />} />
          <Route path='/chats/:chatId' element={<Chat />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
