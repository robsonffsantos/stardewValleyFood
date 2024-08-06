import React from 'react'

const Card = ({ title, onClick }) => {
  return (
    <div 
      className="bg-white shadow-md rounded p-4 cursor-pointer hover:shadow-lg transition-shadow flex-1 h-48 flex items-center justify-center text-center"
      onClick={onClick}
    >
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
  )
}

export default Card
