import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { GlobalProvider } from './context/GlobalContext'
import { AuthProvider } from './context/LoginContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
)
