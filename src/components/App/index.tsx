import './index.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import LayoutLogin from '../layout/LayoutLogin'
import LayoutProtected from '../layout/LayoutProtected'

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
          <Route path='/chats' element={<div>hihi</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
