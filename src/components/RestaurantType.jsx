import React from "react"
import { useNavigate } from "react-router-dom"

const RestaurantType = ({ type }) => {
  const navigate = useNavigate()

  const handleTypeClick = () => {
    navigate(`/restaurants?tipo=${type.toLowerCase()}`)
  }

  return (
    <div 
      className="bg-white shadow-md p-3 sm:p-4 flex flex-col items-center justify-center rounded hover:bg-gray-100 transition-colors duration-200 cursor-pointer h-20 sm:h-24" 
      onClick={handleTypeClick}
    >
      <h3 className="text-sm sm:text-base md:text-xl font-semibold text-center">{type}</h3>
    </div>
  )
}

export default RestaurantType
