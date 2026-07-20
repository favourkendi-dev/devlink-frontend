import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-violet-600 mb-4">Dashboard Page</h1>
      <Link
        to="/profile"
        className="text-violet-600 underline hover:text-violet-700"
      >
        Go to My Profile
      </Link>
    </div>
  )
}

export default Dashboard