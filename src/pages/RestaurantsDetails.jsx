import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'

const RestaurantDetails = () => {
  const { id } = useParams()
  const { restaurants, recipes, addToCart, getCartItems } = useGlobalContext()
  const restaurant = restaurants.find(rest => rest.id === parseInt(id))

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

  const [selectedCategories, setSelectedCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Função utilitária para normalizar categorias
  const normalize = str => str.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase();

  const filteredRecipes = recipes.filter(recipe =>
    restaurant.receitas.includes(recipe.id) &&
    (selectedCategory === null || 
      recipe.categorias.some(cat => normalize(cat) === normalize(selectedCategory))
    )
  )

  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      // Se clicar na mesma categoria, limpa o filtro
      setSelectedCategory(null)
    } else {
      // Se clicar em uma categoria diferente, seleciona ela
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
      addToCart(selectedRecipe.id, quantity)
      setIsModalOpen(false)
    }
  }  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 sm:p-6 md:p-8">
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
          )).map((category, index) => (
            <button
              key={index}
              onClick={() => toggleCategory(category)}
              className={`bg-white border border-amber-600 rounded-full px-3 py-1 sm:px-4 sm:py-2 m-1 sm:m-2 text-sm sm:text-base transition-colors duration-200 ${selectedCategory === category ? "bg-green-600 text-white font-bold shadow-md border-green-600" : "hover:bg-amber-50"}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer max-w-sm mx-auto w-full">
              <img src={recipe.foto} alt={recipe.nome} className="w-full h-20 sm:h-24 object-contain rounded-lg mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110" />
              <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 hover:text-amber-600">{recipe.nome}</h3>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">{recipe.descricao}</p>
              <p className="text-gray-700 mb-2 text-xs sm:text-sm">Ingredientes: {Array.isArray(recipe.ingredientes) ? recipe.ingredientes.join(', ') : 'Não disponível'}</p>
              <p className="text-base sm:text-lg font-bold text-blue-600 mb-3 sm:mb-4">R$ {recipe.preco}</p>
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
            <p className="text-lg font-bold text-blue-600 mb-4">R$ {selectedRecipe.preco}</p>
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
                className="mx-2 text-center border rounded p-2 w-16"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-200 text-gray-700 p-2 rounded"
              >
                +
              </button>
            </div>
            <p className="text-lg font-bold mb-4">Total: R$ {selectedRecipe.preco * quantity}</p>
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
