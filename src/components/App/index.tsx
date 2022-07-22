import './index.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import LayoutLogin from '@/components/layout/LayoutLogin'
import LayoutProtected from '@/components/layout/LayoutProtected'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import Chats from '@/pages/Chats'
import ChatsChat from '@/pages/ChatsChat'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import {ThePageNotFound} from '@/components/ThePageNotFound/ThePageNotFound'

function App() {
  return (
    <div className="App relative">
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
        <Route path="*" element={<ThePageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
