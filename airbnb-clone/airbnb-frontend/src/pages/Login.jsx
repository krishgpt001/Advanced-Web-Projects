import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [localError, setLocalError] = useState(null)
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)
    try {
      await login(formData.email, formData.password)
      navigate('/')
    } catch (err) {
      setLocalError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Welcome back</h2>

      {localError && <p className="auth__error">{localError}</p>}

      <form onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label">Email</label>
          <input
            className="auth__input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth__field">
          <label className="auth__label">Password</label>
          <input
            className="auth__input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="auth__footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login