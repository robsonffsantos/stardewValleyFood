import React, { createContext, useState, useContext, useEffect } from 'react'
import restaurantsData from '../utils/restaurants.json'
import recipesData from '../utils/recipes.json'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [recipes, setRecipes] = useState([])
  const [cart, setCart] = useState({})

  useEffect(() => {
    setRestaurants(restaurantsData)
    setRecipes(recipesData)
  }, [])

  const addToCart = (recipeId, quantity) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart }
      if (quantity === 0) {
        delete updatedCart[recipeId]
      } else {
        updatedCart[recipeId] = quantity
      }
      return updatedCart
    })
  }

  const getCartItems = () => {
    return Object.entries(cart).map(([recipeId, quantity]) => ({ recipeId, quantity }))
  }

  return (
    <GlobalContext.Provider value={{
      restaurants,
      recipes,
      setRestaurants,
      setRecipes,
      cart,
      addToCart,
      getCartItems
    }}>
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
