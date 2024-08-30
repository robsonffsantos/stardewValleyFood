import React from 'react'
import { useAuth } from '../context/LoginContext'
import { useNavigate } from "react-router-dom"

const PromoBanner = ({ onClick }) => {
  const { user, updateBalance } = useAuth()
  const navigate = useNavigate()

  const handlePromoClick = () => {
    if (user) {
      const lastClick = localStorage.getItem('lastPromoClick')
      const currentTime = new Date().getTime()

      if (lastClick && currentTime - lastClick < 3600000) { 
        onClick("Você já resgatou seu bônus hoje.")
      } else {
        updateBalance(5000)
        localStorage.setItem('lastPromoClick', currentTime)
        onClick("Você ganhou 5000 ouros! Aqui estão nossos restaurantes para você aproveitar seus créditos!")
      }
    } else {
      navigate("/register")
    }
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

