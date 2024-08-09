import React, { createContext, useState, useContext, useEffect } from 'react'
import restaurantsData from '../utils/restaurants.json'
import recipesData from '../utils/recipes.json'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    setRestaurants(restaurantsData)
    setRecipes(recipesData)
  }, [])

  return (
    <GlobalContext.Provider value={{ restaurants, recipes, setRestaurants, setRecipes }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

