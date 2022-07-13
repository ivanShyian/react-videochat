import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/components/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import { store } from './store'
import { injectStore } from './api/axios'
import { injectStoreInSockets } from './services/SocketService'

injectStore(store)
injectStoreInSockets(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
)
