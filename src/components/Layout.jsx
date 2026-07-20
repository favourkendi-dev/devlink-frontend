import Navbar from './Navbar'

// Wraps any page that should show the Navbar Puts the Navbar at the top, then renders whatever page was passed in below it
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout