import React from 'react'
import { useAuth } from '../context/LoginContext'
import { useGlobalContext } from '../context/GlobalContext'
import farmerImage from '../assets/farmer.png'
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Profile = () => {
  const { user, getPurchaseHistory } = useAuth()
  const { recipes, restaurants } = useGlobalContext()
  const purchaseHistory = getPurchaseHistory()

  const getFavoriteRecipe = () => {
    if (purchaseHistory.length === 0) return null
    
    const recipeCounts = {}
    purchaseHistory.forEach(purchase => {
      purchase.items.forEach(item => {
        recipeCounts[item.recipeName] = (recipeCounts[item.recipeName] || 0) + item.quantity
      })
    })
    
    const favoriteRecipe = Object.entries(recipeCounts)
      .sort(([,a], [,b]) => b - a)[0]
    
    return favoriteRecipe ? favoriteRecipe[0] : null
  }

  const getFavoriteRestaurant = () => {
    if (purchaseHistory.length === 0) return null
    
    const restaurantCounts = {}
    purchaseHistory.forEach(purchase => {
      purchase.items.forEach(item => {
        restaurantCounts[item.restaurantName] = (restaurantCounts[item.restaurantName] || 0) + 1
      })
    })
    
    const favoriteRestaurant = Object.entries(restaurantCounts)
      .sort(([,a], [,b]) => b - a)[0]
    
    return favoriteRestaurant ? favoriteRestaurant[0] : null
  }

  const favoriteRecipe = getFavoriteRecipe()
  const favoriteRestaurant = getFavoriteRestaurant()

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-gray-700 mb-4">Por favor, faça login para ver seu perfil.</p>
            <Link to="/login">
              <button className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold">
                Fazer Login
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <Link to="/">
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-600 mb-6 hover:text-amber-700 transition-colors duration-200">
                  Stardew Valley Food
                </h1>
              </Link>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Meu Perfil</h2>
              
              <div className="flex flex-col items-center mb-8">
                <img 
                  src={farmerImage} 
                  alt="Usuário" 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 border-4 border-amber-200 shadow-lg" 
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{user.name}</h3>
                <div className="bg-amber-100 rounded-full px-4 py-2">
                  <p className="text-lg font-semibold text-amber-800">
                    Saldo: {user.balance} ouros
                  </p>
                </div>
              </div>
            </div>

            {(favoriteRecipe || favoriteRestaurant) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {favoriteRecipe && (
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">🍽️</span>
                      <h3 className="text-lg font-semibold text-amber-800">Comida Favorita</h3>
                    </div>
                    <p className="text-gray-700 font-medium text-lg">{favoriteRecipe}</p>
                  </div>
                )}
                {favoriteRestaurant && (
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">🏪</span>
                      <h3 className="text-lg font-semibold text-amber-800">Restaurante Favorito</h3>
                    </div>
                    <p className="text-gray-700 font-medium text-lg">{favoriteRestaurant}</p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/purchase-history" className="block">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-xl shadow-md hover:shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-3xl mb-3">📋</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Histórico de Compras</h3>
                    <p className="text-amber-100 text-sm">Veja todos os seus pedidos</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/restaurants" className="block">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-xl shadow-md hover:shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="text-3xl mb-3">🍕</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Ver Restaurantes</h3>
                    <p className="text-amber-100 text-sm">Explore novos sabores</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
