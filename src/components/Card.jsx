import React from 'react'

const Card = ({ title, onClick }) => {
  return (
    <div 
      className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 shadow-lg rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-xl hover:border-amber-400 transition-all duration-300 h-32 sm:h-40 md:h-48 w-full sm:w-64 md:w-80 flex items-center justify-center text-center transform hover:scale-105"
      onClick={onClick}
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold px-2 text-amber-800 leading-tight">{title}</h3>
    </div>
  )
}

export default Card
