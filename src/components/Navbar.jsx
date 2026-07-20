import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// Top navigation bar shown on every logged-in page Similar idea to LinkedIn's top bar: logo on the left
function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Logo / brand name */}
      <Link to="/dashboard" className="text-xl font-bold text-violet-600">
        DevLink
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-gray-600 hover:text-violet-600">
          Dashboard
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-violet-600">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-violet-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar