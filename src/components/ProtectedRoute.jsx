import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { API_ENABLED } from '../config/api'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!API_ENABLED) {
    return children
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
