import { useContext } from 'react'
import { AuthContext } from './authContext'

// A small custom hook so other components can easily use this context instead of importing useContext and AuthContext everywhere separately
export function useAuth() {
  return useContext(AuthContext)
}