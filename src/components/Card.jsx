import React from 'react'

const Card = ({ title, onClick }) => {
  return (
    <div 
      className="bg-white shadow-md rounded p-3 sm:p-4 cursor-pointer hover:shadow-lg transition-shadow flex-1 h-32 sm:h-40 md:h-48 w-full max-w-xs flex items-center justify-center text-center"
      onClick={onClick}
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold px-2">{title}</h3>
    </div>
  )
}

export default Card
