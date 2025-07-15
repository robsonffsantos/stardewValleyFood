import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import Loading from '../components/Loading'

const RestaurantDetails = () => {
  const { id } = useParams()
  const { restaurants, recipes, addToCart, getCartItems } = useGlobalContext()
  const restaurant = restaurants.find(rest => rest.id === parseInt(id))
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const [selectedCategories, setSelectedCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 700)
    
    return () => clearTimeout(timer)
  }, [id])

  if (isLoading) {
    return <Loading message="Carregando restaurante..." />
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow p-8">
          <p className="text-center text-gray-700">Restaurante não encontrado.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const normalize = str => str.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase();

  const filteredRecipes = recipes.filter(recipe =>
    restaurant.receitas.includes(recipe.id) &&
    (selectedCategory === null || 
      recipe.categorias.some(cat => normalize(cat) === normalize(selectedCategory))
    )
  )

  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(quantity + change, 0)
    setQuantity(newQuantity)
    if (newQuantity === 0) {
      setIsModalOpen(false)
    }
  }  

  const handleBuyClick = (recipe) => {
    setSelectedRecipe(recipe)
    setQuantity(1)
    setIsModalOpen(true)
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(selectedRecipe.id, quantity, restaurant.id)
      setIsModalOpen(false)
    }
  }  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
            <button 
                onClick={() => navigate('/restaurants')}
                className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors duration-200 text-sm sm:text-base flex items-center gap-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar aos Restaurantes
            </button>
            <div className="flex-1"></div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <img 
              src={restaurant.image} 
              alt={restaurant.nome} 
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 object-contain rounded-lg transition-transform duration-300 hover:scale-110" 
            />
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 transition-colors duration-300 hover:text-amber-600">{restaurant.nome}</h2>
              <p className="text-gray-700 mb-2 text-sm sm:text-base">{restaurant.descricao}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                <p className="text-gray-700">Endereço: {restaurant.endereco}</p>
                <p className="text-gray-700">Horário: {restaurant.horario_abertura} - {restaurant.horario_fechamento}</p>
                <p className="text-gray-700">Taxa de Entrega: {restaurant.taxa_entrega} ouros</p>
                <p className="text-gray-700">Tempo de Preparo: {restaurant.tempo_preparo}</p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Categorias</h2>
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {Array.from(new Set(
            recipes
              .filter(recipe => restaurant.receitas.includes(recipe.id))
              .flatMap(recipe => recipe.categorias)
          )).map((category, index) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={index}
                onClick={() => toggleCategory(category)}
                className={`rounded-full px-3 py-1 sm:px-4 sm:py-2 m-1 sm:m-2 text-sm sm:text-base transition-colors duration-200 font-semibold ${
                  isSelected 
                    ? "bg-amber-600 text-white border-amber-600 shadow-md" 
                    : "bg-white text-amber-600 border-amber-600 hover:bg-amber-50"
                } border`}>
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer max-w-sm mx-auto w-full">
              <img src={recipe.foto} alt={recipe.nome} className="w-full h-20 sm:h-24 object-contain rounded-lg mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 hover:text-amber-600">{recipe.nome}</h3>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">{recipe.descricao}</p>
              <p className="text-gray-700 mb-2 text-xs sm:text-sm">Ingredientes: {Array.isArray(recipe.ingredientes) ? recipe.ingredientes.join(', ') : 'Não disponível'}</p>
              <p className="text-base sm:text-lg font-bold text-blue-600 mb-3 sm:mb-4">{recipe.preco} ouros</p>
              <div className="flex items-center justify-between mt-auto">
                <button
                  onClick={() => handleBuyClick(recipe)}
                  className="bg-amber-600 text-white p-2 w-full rounded border border-amber-600 hover:bg-amber-700 transition-colors duration-200 text-sm sm:text-base"
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {selectedRecipe && (
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">{selectedRecipe.nome}</h2>
            <img src={selectedRecipe.foto} alt={selectedRecipe.nome} className="w-full h-24 object-contain rounded-lg mb-4 mx-auto" />
            <p className="text-lg font-bold text-blue-600 mb-4">{selectedRecipe.preco} ouros</p>
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-200 text-gray-700 p-2 rounded"
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
                className="bg-gray-200 text-gray-700 p-2 rounded"
              >
                +
              </button>
            </div>
            <p className="text-lg font-bold mb-4">Total: {selectedRecipe.preco * quantity} ouros</p>
            <button
              onClick={handleAddToCart}
              className="bg-amber-600 text-white p-2 w-full rounded hover:bg-amber-700 transition-colors duration-200"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default RestaurantDetails
