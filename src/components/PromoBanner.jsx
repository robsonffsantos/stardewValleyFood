import React from 'react'

const PromoBanner = ({ onClick }) => {
  return (
    <div className="bg-gray-400 h-40 flex items-center justify-center cursor-pointer" onClick={onClick}>
      <h2 className="text-2xl font-semibold p-8">Clique aqui e ganhe 5000 ouros para usar em nosso site</h2>
    </div>
  )
}

export default PromoBanner
