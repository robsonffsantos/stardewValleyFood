import React from 'react'

const Card = ({ title, onClick }) => {
  return (
    <div 
      className="bg-white shadow-md rounded p-4 ml-10 mr-10 cursor-pointer hover:shadow-lg transition-shadow flex-1 h-60 w-80 flex items-center justify-center text-center"
      onClick={onClick}
    >
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
  )
}

export default Card
