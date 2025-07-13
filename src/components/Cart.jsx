import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { useAuth } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from './Modal'

const Cart = () => {
  const { getCartItems, recipes, restaurants, clearCart, removeFromCart, addToCart } = useGlobalContext()
  const { user, updateBalance } = useAuth()
  const navigate = useNavigate()
  
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [removeQuantity, setRemoveQuantity] = useState(1)
  const [showDeliveryScreen, setShowDeliveryScreen] = useState(false)

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
      setShowDeliveryScreen(true)
      
      setTimeout(() => {
        setShowDeliveryScreen(false)
        navigate('/')
      }, 5000)
    } else {
      alert(`Saldo insuficiente. Você tem ${user.balance} ouros, mas precisa de ${totalPrice} ouros.`)
    }
  }

  const handleRemoveItem = (recipeId, currentQuantity) => {
    if (currentQuantity > 1) {
      setItemToRemove({ recipeId, currentQuantity })
      setRemoveQuantity(1)
      setShowRemoveModal(true)
    } else {
      removeFromCart(recipeId)
    }
  }

  const confirmRemove = () => {
    if (itemToRemove) {
      const { recipeId, currentQuantity } = itemToRemove
      const newQuantity = currentQuantity - removeQuantity
      
      if (newQuantity <= 0) {
        removeFromCart(recipeId)
      } else {
        addToCart(recipeId, newQuantity)
      }
      
      setShowRemoveModal(false)
      setItemToRemove(null)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(removeQuantity + change, 1)
    setRemoveQuantity(Math.min(newQuantity, itemToRemove?.currentQuantity || 1))
  }

  if (showDeliveryScreen) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-amber-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-600 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-amber-800 mb-4">Pedido Confirmado!</h2>
              <p className="text-lg text-amber-700 mb-6">Sua comida está a caminho...</p>
              <div className="w-full bg-amber-200 rounded-full h-2 mb-6">
                <div className="bg-amber-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-amber-600 mb-8">Tempo estimado: 30-45 minutos</p>
              <button 
                onClick={() => {
                  setShowDeliveryScreen(false)
                  navigate('/')
                }}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
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
                      onClick={() => handleRemoveItem(recipeId, quantity)}
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

      {showRemoveModal && itemToRemove && (
        <Modal isOpen={showRemoveModal} onRequestClose={() => setShowRemoveModal(false)}>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Remover Item</h2>
            <p className="text-gray-700 mb-4">
              Quantos itens de "{getRecipeDetails(itemToRemove.recipeId)?.nome}" você deseja remover?
            </p>
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                -
              </button>
              <input
                type="number"
                value={removeQuantity}
                onChange={(e) => setRemoveQuantity(Math.max(1, Math.min(Number(e.target.value), itemToRemove.currentQuantity)))}
                className="mx-2 text-center border rounded p-2 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Máximo: {itemToRemove.currentQuantity} itens
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRemove}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
              >
                Remover
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Cart
