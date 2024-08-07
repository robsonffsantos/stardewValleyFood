import React, { useEffect, useState } from 'react'
import recipes from '../utils/recipes.json'

const Banner = () => {
  const [recipeList, setRecipeList] = useState([])

  useEffect(() => {
    setRecipeList([...recipes, ...recipes])
  }, [])

  return (
    <div className="relative max-h-40 w-full p-4 flex items-center justify-center overflow-hidden">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-10 lg:grid-cols-10 grid-rows-5 animate-scroll">
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
