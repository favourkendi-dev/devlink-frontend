import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// Wraps any page that should only be visible to logged-in users If not logged in it  redirects to login instead of showing the page
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute