import React, { createContext, useState, useContext } from 'react'

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [restaurantes, setRestaurantes] = useState([])
  const [receitas, setReceitas] = useState([])

  return (
    <GlobalContext.Provider value={{ restaurantes, receitas, setRestaurantes, setReceitas }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}
