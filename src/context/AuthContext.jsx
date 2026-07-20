import { useState } from 'react'
import { AuthContext } from './authContext'

// This component wraps our whole app so every page can access the auth data
export function AuthProvider({ children }) {
  // On first load it checks if we already have tokens saved in localStorage
  const [authTokens, setAuthTokens] = useState(() => {
    const stored = localStorage.getItem('authTokens')
    return stored ? JSON.parse(stored) : null
  })

  // Called after a successful login, to save the tokens
  const login = (tokens) => {
    setAuthTokens(tokens)
    // Also save to localStorage so tokens survive a page refresh
    localStorage.setItem('authTokens', JSON.stringify(tokens))
  }

  // Called to log the user out, clearing the tokens.
  const logout = () => {
    setAuthTokens(null)
    localStorage.removeItem('authTokens')
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