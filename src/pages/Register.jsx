import { useState } from 'react'
import { registerUser } from '../api/authApi'

function Register() {
  // One piece of state per form field 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Holds any error message we get back from the backend
  const [error, setError] = useState('')

  // Holds a success message once registration works
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    // Stops the browser from doing a full page reload on form submit
    e.preventDefault()

    // Clear old messages before trying again
    setError('')
    setSuccess('')

    try {
      await registerUser({ username, email, password })
      setSuccess('Account created successfully! You can now log in.')
      setUsername('')
      setEmail('')
      setPassword('')
    } catch (err) {
      // The backend sends validation errors as an object
      const backendErrors = err.response?.data
      if (backendErrors) {
        const firstKey = Object.keys(backendErrors)[0]
        setError(backendErrors[firstKey][0])
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h1 className="text-2xl font-bold text-violet-600 mb-6">Register</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-4">{success}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Register
        </button>
      </form>
    </div>
  )
}

export default Register