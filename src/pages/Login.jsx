import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/authApi'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Lets us change pages after a successful login

  // Gives us access to the login() function from AuthContext
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await loginUser({ username, password })
      
      login(response.data)

      // Once logged in send the user to the dashboard
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h1 className="text-2xl font-bold text-violet-600 mb-6">Login</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login