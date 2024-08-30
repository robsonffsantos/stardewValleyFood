import React from "react"
import { useNavigate } from "react-router-dom"

const RestaurantType = ({ type }) => {
  const navigate = useNavigate()

  const handleTypeClick = () => {
    navigate(`/restaurants?tipo=${type.toLowerCase()}`)
  }

  return (
    <div 
      className="bg-white shadow-md p-4 flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8 justify-center align-items rounded hover:bg-gray-400" 
      onClick={handleTypeClick}
    >
      <h3 className="text-xl font-semibold">{type}</h3>
    </div>
  )
}

export default RestaurantType
