import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RecipeDetail = () => {
  const { id } = useParams()
  const { recipes, restaurants } = useGlobalContext()

  const recipe = recipes.find((recipe) => recipe.id === parseInt(id))
  const restaurant = restaurants.find((restaurant) =>
    restaurant.receitas.includes(recipe?.id)
  )

  if (!recipe || !restaurant) {
    return <div>Receita não encontrada!</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <h4 className="text-3xl font-semibold mt-6 text-center">Que tal esse prato?</h4>
      <div className="flex-grow p-4">
        <div className="grid gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <img
              src={recipe.foto}
              alt={recipe.nome}
              className="w-full md:w-1/3 h-20 object-contain rounded-lg"
            />
            <div className="flex flex-col justify-center md:w-2/3 p-4">
              <h1 className="text-2xl font-bold mb-2">{recipe.nome}</h1>
              <p className="mb-2">{recipe.descricao}</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Ingredientes:</strong> {recipe.ingredientes.join(', ')}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Preço:</strong> {recipe.preco} ouros
              </p>
            </div>
          </div>

          <h4 className="text-3xl font-semibold mt-6 text-center">Você encontra ele aqui!</h4>

          <Link to={`/restaurant/${restaurant.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
              <img
                src={restaurant.image}
                alt={restaurant.nome}
                className="w-full md:w-1/3 h-40 object-contain rounded-lg"
              />
              <div className="flex flex-col justify-center md:w-2/3 p-4">
                <h2 className="text-xl font-bold mb-2">{restaurant.nome}</h2>
                <p className="mb-2">{restaurant.descricao}</p>
                <p className="text-sm text-gray-700 mb-2">
                  Endereço: {restaurant.endereco}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Horário: {restaurant.horario_abertura} - {restaurant.horario_fechamento}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Taxa de Entrega: {restaurant.taxa_entrega} ouros
                </p>
                <p className="text-sm text-gray-700">
                  Tempo de Preparo: {restaurant.tempo_preparo}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RecipeDetail
