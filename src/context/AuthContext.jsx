import { createContext, useContext, useState } from 'react'

// Create the context itself this is like a "box" that will hold our auth data.
const AuthContext = createContext()

// This component wraps our whole app so every page can access the auth data.
export function AuthProvider({ children }) {
  // This holds the logged in user's tokens
  const [authTokens, setAuthTokens] = useState(null)

  // Called after a successful login to save the tokens.
  const login = (tokens) => {
    setAuthTokens(tokens)
  }

  // Called to log the user out clearing the tokens.
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

// A small custom hook so other components can easily use this context instead of importing useContext and AuthContext everywhere separately

export function useAuth() {
  return useContext(AuthContext)
}