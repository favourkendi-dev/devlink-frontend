import { useState } from 'react'
import { AuthContext } from './authContext'

// This component wraps our whole app so every page can access the auth data
export function AuthProvider({ children }) {
  // Holds the logged in user's tokens
  const [authTokens, setAuthTokens] = useState(null)

  // Called after a successful login to save the tokens
  const login = (tokens) => {
    setAuthTokens(tokens)
  }

  // Called to log the user out clearing the tokens
  const logout = () => {
    setAuthTokens(null)
  }

  const value = {
    authTokens,
    login,
    logout,
    isLoggedIn: authTokens !== null,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}