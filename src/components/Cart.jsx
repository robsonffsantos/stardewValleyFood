import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Cart = () => {
  const { getCartItems, recipes, restaurants } = useGlobalContext()
  const cartItems = getCartItems()

  const getRecipeDetails = (recipeId) => {
    return recipes.find(recipe => recipe.id === recipeId)
  }

  const getRestaurantDetails = (recipeId) => {
    const recipe = getRecipeDetails(recipeId)
    return restaurants.find(restaurant => restaurant.receitas.includes(recipeId))
  }

  const totalPrice = cartItems.reduce((total, { recipeId, quantity }) => {
    const recipe = getRecipeDetails(recipeId)
    return total + (recipe.preco * quantity)
  }, 0)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Carrinho</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map(({ recipeId, quantity }) => {
                const recipe = getRecipeDetails(recipeId)
                const restaurant = getRestaurantDetails(recipeId)
                return (
                  <div key={recipeId} className="flex items-center justify-between mb-4 p-4 border-b">
                    <img src={recipe.foto} alt={recipe.nome} className="w-16 h-16 object-contain mr-4" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{recipe.nome}</h3>
                      <p className="text-gray-700">Quantidade: {quantity}</p>
                      <p className="text-lg font-bold text-blue-600">{recipe.preco * quantity} ouros</p>
                      <p className="text-sm text-gray-500">Restaurante: {restaurant.nome}</p>
                    </div>
                  </div>
                )
              })}
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-blue-600">Total: {totalPrice} ouros </p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Finalizar Compra</button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700">Seu carrinho está vazio.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
