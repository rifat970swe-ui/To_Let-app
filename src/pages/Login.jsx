import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../config/api'

function saveAuth(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  window.dispatchEvent(new Event('auth-changed'))
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: '', text: '' })

  async function onSubmit(e) {
    e.preventDefault()

    if (!email.trim() || !password) {
      setStatus({ type: 'error', text: 'Email and password are required.' })
      return
    }

    setStatus({ type: '', text: '' })

    try {
      const res = await api.post('/api/auth/login', { email: email.trim(), password })
      const { token, user } = res.data
      saveAuth(token, user)
      setStatus({ type: 'success', text: 'Logged in with server account.' })
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo)
    } catch (err) {
      const demoUser = {
        name: email.split('@')[0] || 'Demo User',
        email: email.trim(),
        demoMode: true,
      }

      saveAuth(`demo-token-${Date.now()}`, demoUser)
      setStatus({ type: 'warning', text: 'Backend unavailable. Logged in using local demo mode.' })
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <p className="mb-4 text-sm text-gray-500">If API is offline, this form signs you in with demo mode.</p>
      {status.text ? (
        <div
          className={`mb-4 text-sm ${
            status.type === 'error'
              ? 'text-red-700'
              : status.type === 'warning'
                ? 'text-amber-700'
                : 'text-green-700'
          }`}
        >
          {status.text}
        </div>
      ) : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Sign in</button>
        </div>
      </form>
    </div>
  )
}
