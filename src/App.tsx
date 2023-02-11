import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'

import HomePage from './pages/home'
import ProfilePage from './pages/profile'
import LoginPage from './pages/login'
import { TAuthState } from './storage/state'

function App() {
  const mode = useSelector((state: TAuthState) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state: TAuthState) => state.token))

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/home" 
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/profile" 
              element={isAuth ? <ProfilePage /> : <Navigate to="/home" />} 
            />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
