import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom'
import { isLoggedIn } from './api/services/auth'

import { IAuthContext } from './interfaces/IUser'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard/index'
import NotFound from './pages/NotFoud'

let AuthContext = React.createContext<IAuthContext>(null!)

function AuthProvider ({ children }: { children: React.ReactNode }) {
  let [auth, setAuth] = React.useState<any>(null)
  let value = { auth, setAuth }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth () {
  return React.useContext(AuthContext)
}

function RequireAuth ({ children }: { children: JSX.Element }) {
  let auth = useAuth()
  let location = useLocation()

  if (!isLoggedIn()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/' state={{ from: location }} replace />
  }
  return children
}

export default function Router () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/home'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
