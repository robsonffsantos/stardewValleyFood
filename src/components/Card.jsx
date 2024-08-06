import React from 'react'

const Card = ({ title, onClick }) => {
  return (
    <div 
      className="bg-white shadow-md rounded p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  )
}

export default Card
