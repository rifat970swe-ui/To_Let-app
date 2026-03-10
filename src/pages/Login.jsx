import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api, { API_ENABLED } from '../config/api'

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

  function completeLogin(user, type, text) {
    saveAuth(`demo-token-${Date.now()}`, user)
    setStatus({ type, text })
    const redirectTo = location.state?.from || '/'
    navigate(redirectTo)
  }

  function loginWithDemoAccount() {
    const cleanEmail = email.trim() || 'demo@tolet.app'
    const demoUser = {
      name: cleanEmail.split('@')[0] || 'Demo User',
      email: cleanEmail,
      demoMode: true,
    }

    completeLogin(demoUser, 'warning', 'Demo mode sign in successful.')
  }

  async function onSubmit(e) {
    e.preventDefault()

    if (!email.trim()) {
      setStatus({ type: 'error', text: 'Email is required.' })
      return
    }

    if (API_ENABLED && !password) {
      setStatus({ type: 'error', text: 'Password is required in API mode.' })
      return
    }

    setStatus({ type: '', text: '' })

    if (!API_ENABLED) {
      loginWithDemoAccount()
      return
    }

    try {
      const res = await api.post('/api/auth/login', { email: email.trim(), password })
      const token = res.data?.token || res.data?.accessToken || res.data?.data?.token
      const user = res.data?.user || res.data?.data?.user || { email: email.trim() }

      if (!token) {
        throw new Error('Token missing in login response')
      }

      saveAuth(token, user)
      setStatus({ type: 'success', text: 'Logged in with server account.' })
      const redirectTo = location.state?.from || '/'
      navigate(redirectTo)
    } catch (err) {
      loginWithDemoAccount()
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <p className="mb-4 text-sm text-gray-500">
        {API_ENABLED
          ? 'API mode enabled. If API fails, demo mode is used automatically.'
          : 'Demo mode enabled. Set VITE_API_BASE_URL in .env to use backend login.'}
      </p>
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
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required={API_ENABLED} />
        </div>
        <div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Sign in</button>
        </div>
        <div>
          <button type="button" onClick={loginWithDemoAccount} className="text-indigo-600 text-sm hover:underline">
            Continue with demo account
          </button>
        </div>
      </form>
    </div>
  )
}
