import React, { useEffect, useState } from 'react'
import recipes from '../utils/recipes.json'

const Banner = () => {
  const [recipeList, setRecipeList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setRecipeList([...recipes, ...recipes])
    // Pequeno delay para garantir que a animação comece após o carregamento
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  return (
    <div className="relative max-h-40 w-full p-4 flex items-center justify-center overflow-hidden">
      <div className={`grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8 grid-rows-5 gap-6 ${isLoaded ? 'animate-scroll' : ''}`}>
        {recipeList.map((recipe, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={recipe.foto}
              alt={recipe.name}
              className="w-24 h-24 object-cover"
            />
          </div>
        ))}
      </div>
      <h2 className="absolute bottom-12 text-2xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded">
        Sua comida a um clique de distância
      </h2>
    </div>
  )
}

export default Banner
