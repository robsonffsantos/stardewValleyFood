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

  const filteredRecipes = recipes.filter(recipe =>
    restaurant.receitas.includes(recipe.id) &&
    (selectedCategories.length === 0 || selectedCategories.some(category => recipe.categorias.includes(category)))
  )

  const toggleCategory = (category) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category)
        ? prevSelected.filter(cat => cat !== category)
        : [...prevSelected, category]
    )
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
      <div className="flex-grow p-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <img src={restaurant.image} alt={restaurant.nome} className={`w-60 h-60 object-contain ${restaurant.id % 2 === 0 ? 'float-right ml-4' : 'float-left mr-4'}`} />
          <h2 className="text-3xl font-semibold mb-4">{restaurant.nome}</h2>
          <p className="text-gray-700 mb-2">{restaurant.descricao}</p>
          <p className="text-gray-700 mb-2">Endereço: {restaurant.endereco}</p>
          <p className="text-gray-700 mb-2">Horário: {restaurant.horario_abertura} - {restaurant.horario_fechamento}</p>
          <p className="text-gray-700 mb-2">Taxa de Entrega: {restaurant.taxa_entrega} ouros</p>
          <p className="text-gray-700 mb-2">Tempo de Preparo: {restaurant.tempo_preparo}</p>
        </div>
        <h2 className="text-3xl font-semibold mb-6 text-center">Categorias</h2>
        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from(new Set(recipes.flatMap(recipe => recipe.categorias))).map((category, index) => (
            <button
              key={index}
              onClick={() => toggleCategory(category)}
              className={`bg-white border border-black rounded-full px-4 py-2 m-2 ${selectedCategories.includes(category) ? "bg-gray-300" : ""}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
              <img src={recipe.foto} alt={recipe.nome} className="w-full h-24 object-contain rounded-lg mb-4" />
              <h3 className="text-lg font-semibold mb-2">{recipe.nome}</h3>
              <p className="text-gray-700 mb-4">{recipe.descricao}</p>
              <p className="text-gray-700 mb-2">Ingredientes: {Array.isArray(recipe.ingredientes) ? recipe.ingredientes.join(', ') : 'Não disponível'}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">R$ {recipe.preco}</p>
              <div className="flex items-center justify-between mt-auto">
                <button
                  onClick={() => handleBuyClick(recipe)}
                  className="bg-blue-500 text-white p-2 w-full rounded border border-blue-500"
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
              className="bg-blue-500 text-white p-2 w-full rounded"
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
