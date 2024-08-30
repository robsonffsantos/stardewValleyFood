import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/LoginContext'

const ProtectedRoute = ({ element: Element }) => {
  const { user } = useAuth()

  return user ? <Element /> : <Navigate to="/login" />
}

export default ProtectedRoute
