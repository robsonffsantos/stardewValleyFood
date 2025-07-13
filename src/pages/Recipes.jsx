import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { recipes, restaurants, addToCart } = useGlobalContext()
  const [currentRecipeId, setCurrentRecipeId] = useState(parseInt(id))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const recipe = recipes.find((recipe) => recipe.id === currentRecipeId)
  const restaurant = restaurants.find((restaurant) =>
    restaurant.receitas.includes(recipe?.id)
  )

  const generateRandomRecipe = () => {
    const availableRecipes = recipes.filter(recipe => 
      restaurants.some(restaurant => restaurant.receitas.includes(recipe.id))
    )
    if (availableRecipes.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * availableRecipes.length)
    const newRecipeId = availableRecipes[randomIndex].id
    
    if (newRecipeId === currentRecipeId && availableRecipes.length > 1) {
      const nextIndex = (randomIndex + 1) % availableRecipes.length
      const nextRecipeId = availableRecipes[nextIndex].id
      setCurrentRecipeId(nextRecipeId)
      navigate(`/recipes/${nextRecipeId}`)
    } else {
      setCurrentRecipeId(newRecipeId)
      navigate(`/recipes/${newRecipeId}`)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(quantity + change, 1)
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (quantity > 0 && recipe && restaurant) {
      addToCart(recipe.id, quantity, restaurant.id)
      setIsModalOpen(false)
      setQuantity(1)
    }
  }

  useEffect(() => {
    setCurrentRecipeId(parseInt(id))
  }, [id])

  if (!recipe || !restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-gray-700 mb-4">Receita não encontrada!</p>
            <button 
              onClick={generateRandomRecipe}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold"
            >
              Me Mostre Outra Sugestão
            </button>
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
        <div className="max-w-4xl mx-auto">
          <h4 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Que tal esse prato?</h4>
          
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/3 h-40 flex items-center justify-center flex-shrink-0">
                <img
                  src={recipe.foto}
                  alt={recipe.nome}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between md:w-2/3 text-center md:text-left">
                <div className="flex-1">
                  <h1 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{recipe.nome}</h1>
                  <p className="mb-2 text-gray-700 line-clamp-2 text-sm">{recipe.descricao}</p>
                  <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                    <strong>Ingredientes:</strong> {Array.isArray(recipe.ingredientes) ? recipe.ingredientes.join(', ') : 'Não disponível'}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-amber-600 mb-4">
                    {recipe.preco} ouros
                  </p>
                </div>
                <div className="flex flex-row gap-2 justify-center md:justify-start">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-amber-600 text-white px-3 py-2 rounded hover:bg-amber-700 transition-colors duration-200 font-semibold text-sm flex-1 sm:flex-none"
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button
                    onClick={generateRandomRecipe}
                    className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors duration-200 font-semibold text-sm flex-1 sm:flex-none"
                  >
                    Me Mostre Outra Sugestão
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Você encontra ele aqui!</h4>
          
          <Link to={`/restaurant/${restaurant.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-1/3 h-40 flex items-center justify-center flex-shrink-0">
                  <img
                    src={restaurant.image}
                    alt={restaurant.nome}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center md:w-2/3 text-center md:text-left">
                  <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{restaurant.nome}</h2>
                  <p className="mb-2 text-gray-700 line-clamp-2 text-sm">{restaurant.descricao}</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p><strong>Endereço:</strong> <span className="line-clamp-1">{restaurant.endereco}</span></p>
                    <p><strong>Horário:</strong> {restaurant.horario_abertura} - {restaurant.horario_fechamento}</p>
                    <p><strong>Taxa de Entrega:</strong> {restaurant.taxa_entrega} ouros</p>
                    <p><strong>Tempo de Preparo:</strong> {restaurant.tempo_preparo}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />

      {recipe && (
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{recipe.nome}</h2>
            <img src={recipe.foto} alt={recipe.nome} className="w-full h-24 object-contain rounded-lg mb-4 mx-auto" />
            <p className="text-lg font-bold text-amber-600 mb-4">{recipe.preco} ouros</p>
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
                className="mx-2 text-center border rounded p-2 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                +
              </button>
            </div>
            <p className="text-lg font-bold mb-4">Total: {recipe.preco * quantity} ouros</p>
            <button
              onClick={handleAddToCart}
              className="bg-amber-600 text-white p-2 w-full rounded hover:bg-amber-700 transition-colors duration-200 font-semibold"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default RecipeDetail
