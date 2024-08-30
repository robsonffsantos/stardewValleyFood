import React from 'react'
import { useAuth } from '../context/LoginContext'
import { useNavigate } from "react-router-dom"

const PromoBanner = ({ onClick }) => {
  const { user, updateBalance } = useAuth()
  const navigate = useNavigate()

  const handlePromoClick = () => {
    if (user) {
      updateBalance(5000)
    } else {
      navigate("/register")
    }
    onClick()
  }

  return (
    <div className="bg-gray-400 h-40 flex items-center justify-center cursor-pointer" onClick={handlePromoClick}>
      <h2 className="text-2xl font-semibold p-8">
        {user ? 'Clique aqui e ganhe 5000 ouros para usar em nosso site!' : 'Registre-se hoje e ganhe 5000 ouros para gastar em nossos restaurantes!'}
      </h2>
    </div>
  )
}

export default PromoBanner
