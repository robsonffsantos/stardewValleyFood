import React from 'react'
import { useAuth } from '../context/LoginContext'
import { useNavigate } from "react-router-dom"

const PromoBanner = ({ onClick }) => {
  const { user, updateBalance } = useAuth()
  const navigate = useNavigate()

  const hasClaimedBonus = () => {
    const lastClick = localStorage.getItem('lastPromoClick')
    if (!lastClick) return false
    
    const currentTime = new Date().getTime()
    return currentTime - lastClick < 3600000
  }

  const handlePromoClick = () => {
    if (user) {
      if (hasClaimedBonus()) { 
        onClick("Você já aproveitou seu bônus diário! Volte amanhã para mais surpresas! 🎉")
      } else {
        updateBalance(5000)
        localStorage.setItem('lastPromoClick', new Date().getTime())
        onClick("Incrível! Você ganhou 5000 ouros! 🎉 Agora é hora de explorar nossos deliciosos restaurantes e descobrir pratos incríveis!")
      }
    } else {
      navigate("/register")
    }
  }

  if (user && hasClaimedBonus()) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-24 sm:h-28 flex items-center justify-center cursor-pointer hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg" onClick={handlePromoClick}>
      <div className="text-center px-4">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
          {user ? '🎁 Clique aqui e ganhe 5000 ouros!' : '🎁 Registre-se e ganhe 5000 ouros!'}
        </h2>
        <p className="text-sm text-amber-100">
          {user ? 'Use seus créditos em nossos restaurantes!' : 'Comece sua jornada gastronômica!'}
        </p>
      </div>
    </div>
  )
}

export default PromoBanner

