import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { AppRouter } from './app/router/AppRouter'
import { Toaster } from "@/shared/ui/sonner"
import { StudentProvider } from './entities/student/model/StudentProvider'
import { AuthProvider } from './features/auth/context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <StudentProvider>
            <AppRouter />
            <Toaster />
          </StudentProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
