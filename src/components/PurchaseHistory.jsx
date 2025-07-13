import React, { useState } from 'react'
import { useAuth } from '../context/LoginContext'
import { useGlobalContext } from '../context/GlobalContext'
import Header from './Header'
import Footer from './Footer'

const PurchaseHistory = () => {
  const { user, getPurchaseHistory } = useAuth()
  const { recipes, restaurants } = useGlobalContext()
  const purchaseHistory = getPurchaseHistory()
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const totalPages = Math.ceil(purchaseHistory.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPurchases = purchaseHistory.slice().reverse().slice(startIndex, endIndex)

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToFirstPage = () => setCurrentPage(1)
  const goToLastPage = () => setCurrentPage(totalPages)
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1))
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1))

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const favoriteRecipe = getFavoriteRecipe()
  const favoriteRestaurant = getFavoriteRestaurant()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">Histórico de Compras</h1>
            <button 
              onClick={() => window.history.back()}
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors duration-200 text-sm sm:text-base flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
          </div>

          {purchaseHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma compra ainda</h2>
              <p className="text-gray-600">Faça sua primeira compra para ver seu histórico aqui!</p>
            </div>
          ) : (
            <>
              {(favoriteRecipe || favoriteRestaurant) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {favoriteRecipe && (
                    <div className="bg-white rounded-lg shadow-md p-4 border border-amber-100">
                      <h3 className="text-lg font-semibold text-amber-800 mb-2">🍽️ Comida Favorita</h3>
                      <p className="text-gray-700 font-medium">{favoriteRecipe}</p>
                    </div>
                  )}
                  {favoriteRestaurant && (
                    <div className="bg-white rounded-lg shadow-md p-4 border border-amber-100">
                      <h3 className="text-lg font-semibold text-amber-800 mb-2">🏪 Restaurante Favorito</h3>
                      <p className="text-gray-700 font-medium">{favoriteRestaurant}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4 mb-6">
                {currentPurchases.map((purchase, index) => (
                  <div key={startIndex + index} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Pedido #{purchaseHistory.length - (startIndex + index)}
                        </h3>
                        <p className="text-sm text-gray-600">{formatDate(purchase.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-amber-600">
                          {purchase.total} ouros
                        </p>
                        <p className="text-xs text-gray-500">
                          Taxa de entrega: {purchase.deliveryFee} ouros
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {purchase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.recipeName}</p>
                            <p className="text-sm text-gray-600">
                              {item.restaurantName} • Qtd: {item.quantity}
                            </p>
                          </div>
                          <p className="text-amber-600 font-semibold">
                            {item.price} ouros
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg shadow-md p-4 border border-gray-100">
                  <div className="text-sm text-gray-600">
                    Mostrando {startIndex + 1} a {Math.min(endIndex, purchaseHistory.length)} de {purchaseHistory.length} pedidos
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="Primeira página"
                    >
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="Página anterior"
                    >
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                          {page === '...' ? (
                            <span className="px-2 text-gray-400">...</span>
                          ) : (
                            <button
                              onClick={() => goToPage(page)}
                              className={`w-8 h-8 rounded-md text-sm font-medium transition-colors duration-200 ${
                                currentPage === page
                                  ? 'bg-amber-600 text-white'
                                  : 'text-amber-600 hover:bg-amber-100'
                              }`}
                            >
                              {page}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="Próxima página"
                    >
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <button
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="Última página"
                    >
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PurchaseHistory 