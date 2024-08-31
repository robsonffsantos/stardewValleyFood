import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Cart = () => {
  const { getCartItems, recipes } = useGlobalContext()
  const cartItems = getCartItems()

  const getRecipeDetails = (recipeId) => {
    return recipes.find(recipe => recipe.id === recipeId)
  }

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
                if (!recipe) {
                  return (
                    <div key={recipeId} className="flex items-center justify-between mb-4 p-4 border-b">
                      <div>
                        <h3 className="text-lg font-semibold text-red-600">Item não encontrado</h3>
                        <p className="text-gray-700">Quantidade: {quantity}</p>
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={recipeId} className="flex items-center justify-between mb-4 p-4 border-b">
                    <div>
                      <h3 className="text-lg font-semibold">{recipe.nome}</h3>
                      <p className="text-gray-700">Quantidade: {quantity}</p>
                      <p className="text-lg font-bold text-blue-600">R$ {recipe.preco * quantity}</p>
                    </div>
                  </div>
                )
              })}
              <div className="text-center mt-4">
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
