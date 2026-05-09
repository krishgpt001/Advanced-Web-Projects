import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">Airbnb Clone</Link>

      <div className="navbar__links">
        {user ? (
          <>
            <span className="navbar__greeting">Hi, {user.name}</span>
            <Link to="/add-property" className="navbar__link">Add listing</Link>
            <Link to="/dashboard" className="navbar__link">Dashboard</Link>
            <button onClick={handleLogout} className="navbar__btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__link">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar