import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setMessage('')
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      const { token, user } = res.data
      // store token locally
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      window.dispatchEvent(new Event('auth-changed'))
      setMessage('Logged in')
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo)
    } catch (err) {
      console.error(err)
      setMessage('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      {message && <div className="mb-4 text-sm text-green-700">{message}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Sign in</button>
        </div>
      </form>
    </div>
  )
}
