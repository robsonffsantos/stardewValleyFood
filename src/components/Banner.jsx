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
    <div className="relative max-h-32 sm:max-h-40 w-full p-2 sm:p-4 flex items-center justify-center overflow-hidden">
      <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 grid-rows-3 sm:grid-rows-4 md:grid-rows-5 gap-3 sm:gap-4 md:gap-6 ${isLoaded ? 'animate-scroll' : ''}`}>
        {recipeList.map((recipe, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={recipe.foto}
              alt={recipe.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded"
            />
          </div>
        ))}
      </div>
      <h2 className="absolute bottom-6 sm:bottom-12 text-lg sm:text-xl md:text-2xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded text-center">
        Sua comida a um clique de distância
      </h2>
    </div>
  )
}

export default Banner
