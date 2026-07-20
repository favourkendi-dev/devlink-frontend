import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() => {
    const stored = localStorage.getItem('authTokens')
    return stored ? JSON.parse(stored) : null
  })

  const login = (tokens) => {
    setAuthTokens(tokens)
    localStorage.setItem('authTokens', JSON.stringify(tokens))
  }

  const logout = () => {
    setAuthTokens(null)
    localStorage.removeItem('authTokens')
  }

  // Decodes the access token to get the current username
  const getCurrentUsername = () => {
    if (!authTokens) return null
    const decoded = jwtDecode(authTokens.access)
    return decoded.username
  }

  const value = {
    authTokens,
    login,
    logout,
    isLoggedIn: authTokens !== null,
    currentUsername: getCurrentUsername(),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}