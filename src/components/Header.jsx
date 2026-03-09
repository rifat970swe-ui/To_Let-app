import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null')
    } catch (err) {
      return null
    }
  })

  useEffect(() => {
    function syncUser() {
      try {
        setUser(JSON.parse(localStorage.getItem('user') || 'null'))
      } catch (err) {
        setUser(null)
      }
    }

    window.addEventListener('storage', syncUser)
    window.addEventListener('auth-changed', syncUser)
    return () => {
      window.removeEventListener('storage', syncUser)
      window.removeEventListener('auth-changed', syncUser)
    }
  }, [])

  function onLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.dispatchEvent(new Event('auth-changed'))
    navigate('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">Tolet</Link>
        <nav className="space-x-4 flex items-center">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.name || user.email || 'Signed in'}
              </span>
              <button type="button" onClick={onLogout} className="text-gray-600 hover:text-indigo-600">
                Logout
              </button>
            </>
          ) : (
            <Link className="text-gray-600 hover:text-indigo-600" to="/login">Sign in</Link>
          )}
          <Link className="text-white bg-indigo-600 px-3 py-1 rounded" to="/create">Create Listing</Link>
        </nav>
      </div>
    </header>
  )
}
