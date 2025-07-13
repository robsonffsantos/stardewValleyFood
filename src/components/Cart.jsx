import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { useAuth } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Cart = () => {
  const { getCartItems, recipes, restaurants, clearCart, removeFromCart } = useGlobalContext()
  const { user, updateBalance } = useAuth()
  const navigate = useNavigate()

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

  const handleCheckout = () => {
    if (!user) {
      alert('Por favor, faça login para finalizar a compra.')
      navigate('/login')
      return
    }

    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio.')
      return
    }

    if (user.balance >= totalPrice) {
      updateBalance(-totalPrice)
      clearCart()
      alert('Compra finalizada com sucesso! Sua comida está a caminho.')
      navigate('/')
    } else {
      alert(`Saldo insuficiente. Você tem ${user.balance} ouros, mas precisa de ${totalPrice} ouros.`)
    }
  }

  const handleRemoveItem = (recipeId) => {
    removeFromCart(recipeId)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Carrinho</h2>
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-4xl mx-auto">
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map(({ recipeId, quantity }) => {
                const recipe = getRecipeDetails(recipeId)
                const restaurant = getRestaurantDetails(recipeId)
                return (
                  <div key={recipeId} className="flex flex-col sm:flex-row items-center justify-between mb-4 p-3 sm:p-4 border-b gap-3 sm:gap-4">
                    <div className="flex items-center flex-1 min-w-0">
                      <img src={recipe.foto} alt={recipe.nome} className="w-12 h-12 sm:w-16 sm:h-16 object-contain mr-3 sm:mr-4 rounded" />
                      <div className="flex-grow min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold truncate">{recipe.nome}</h3>
                        <p className="text-sm sm:text-base text-gray-700">Quantidade: {quantity}</p>
                        <p className="text-base sm:text-lg font-bold text-blue-600">{recipe.preco * quantity} ouros</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">Restaurante: {restaurant.nome}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(recipeId)}
                      className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-600 transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                    >
                      Remover
                    </button>
                  </div>
                )
              })}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3 sm:gap-0">
                <p className="text-lg sm:text-xl font-bold text-blue-600">Total: {totalPrice} ouros</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate('/restaurants')}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Continuar Comprando
                  </button>
                  <button 
                    onClick={handleCheckout}
                    className="bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-700 mb-4">Seu carrinho está vazio.</p>
              <button 
                onClick={() => navigate('/restaurants')}
                className="bg-amber-600 text-white py-2 px-6 rounded hover:bg-amber-700 transition-colors duration-200"
              >
                Ver Restaurantes
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
