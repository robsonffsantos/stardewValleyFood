import React from 'react'

const RestaurantType = ({ type }) => {
  return (
    <div className="bg-white shadow-md rounded p-2 cursor-pointer hover:shadow-lg transition-shadow text-center flex-1">
      <h3 className="text-md font-semibold">{type}</h3>
    </div>
  )
}

export default RestaurantType