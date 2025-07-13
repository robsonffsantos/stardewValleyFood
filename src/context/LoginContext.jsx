import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email, password) => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.email === email && parsedUser.password === password) {
        setUser(parsedUser)
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateBalance = (amount) => {
    if (user) {
      const updatedUser = { ...user, balance: (user.balance || 0) + amount }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const register = (name, email, password) => {
    const newUser = { name, email, password, balance: 0, purchaseHistory: [] }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const addPurchaseToHistory = (purchase) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        purchaseHistory: [...(user.purchaseHistory || []), purchase] 
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const getPurchaseHistory = () => {
    return user?.purchaseHistory || []
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateBalance, register, addPurchaseToHistory, getPurchaseHistory }}>
      {children}
    </AuthContext.Provider>
  )
}
