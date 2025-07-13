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

  const addToCart = (recipeId, quantity, restaurantId) => {
    const cartKey = `${recipeId}-${restaurantId}`
    setCart(prevCart => {
      const updatedCart = { ...prevCart }
      if (quantity === 0) {
        delete updatedCart[cartKey]
      } else {
        updatedCart[cartKey] = { recipeId, quantity, restaurantId }
      }
      return updatedCart
    })
  }

  const getCartItems = () => {
    return Object.values(cart).map(item => ({
      recipeId: item.recipeId,
      quantity: item.quantity,
      restaurantId: item.restaurantId
    }))
  }

  const getCartRestaurants = () => {
    const cartItems = getCartItems()
    const restaurantIds = new Set()
    
    cartItems.forEach(({ restaurantId }) => {
      restaurantIds.add(restaurantId)
    })
    
    return Array.from(restaurantIds).map(id => 
      restaurants.find(rest => rest.id === id)
    ).filter(Boolean)
  }

  const getDeliveryFee = () => {
    const cartRestaurants = getCartRestaurants()
    return cartRestaurants.reduce((total, restaurant) => total + restaurant.taxa_entrega, 0)
  }

  const getCartTotal = () => {
    const cartItems = getCartItems()
    const subtotal = cartItems.reduce((total, { recipeId, quantity }) => {
      const recipe = recipes.find(recipe => recipe.id === recipeId)
      return total + (recipe.preco * quantity)
    }, 0)
    
    return subtotal + getDeliveryFee()
  }

  const clearCart = () => {
    setCart({})
  }

  const removeFromCart = (recipeId, restaurantId) => {
    const cartKey = `${recipeId}-${restaurantId}`
    setCart(prevCart => {
      const updatedCart = { ...prevCart }
      delete updatedCart[cartKey]
      return updatedCart
    })
  }

  return (
    <GlobalContext.Provider value={{
      restaurants,
      recipes,
      setRestaurants,
      setRecipes,
      cart,
      addToCart,
      getCartItems,
      getCartRestaurants,
      getDeliveryFee,
      getCartTotal,
      clearCart,
      removeFromCart
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}
