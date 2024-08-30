import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RestaurantDetails = () => {
  const { id } = useParams()
  const { restaurants, recipes } = useGlobalContext()
  const restaurant = restaurants.find(rest => rest.id === parseInt(id))
  const [selectedCategories, setSelectedCategories] = useState([])

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
              className={`bg-white border border-black rounded-full px-4 py-2 m-2 ${
                selectedCategories.includes(category) ? "bg-gray-300" : ""
              }`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
            <img src={recipe.foto} alt={recipe.nome} className="w-full h-24 object-contain rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">{recipe.nome}</h3>
            <p className="text-gray-700 mb-4">{recipe.descricao}</p>
            <p className="text-gray-700 mb-2">Ingredientes: {recipe.ingredientes.join(', ')}</p>
            <p className="text-lg font-bold text-blue-600 mb-4">R$ {recipe.preco}</p>
            <div className="flex items-center justify-between mt-auto">
              <button className="bg-gray-200 text-gray-700 p-2 rounded-l-lg border border-gray-400">-</button>
              <button className="bg-blue-500 text-white p-2 rounded-r-lg w-full border border-blue-500">Comprar</button>
              <button className="bg-gray-200 text-gray-700 p-2 rounded-r-lg border border-gray-400">+</button>
            </div>
          </div>
          
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RestaurantDetails
