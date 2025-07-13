import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useGlobalContext } from '../context/GlobalContext'
import Header from "../components/Header"
import Footer from "../components/Footer"

const Restaurants = () => {
    const { restaurants } = useGlobalContext()
    const location = useLocation()
    const navigate = useNavigate()

    const searchParams = new URLSearchParams(location.search)
    const tipo = searchParams.get('tipo')

    const filteredRestaurants = tipo 
        ? restaurants.filter(restaurant => restaurant.tipo.some(t => t.toLowerCase() === tipo)) 
        : restaurants

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-3 sm:p-4">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors duration-200 text-sm sm:text-base flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Voltar
                    </button>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center flex-1">Restaurantes</h2>
                    <div className="w-20"></div>
                </div>
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
                                <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.nome}
                                        className="w-full h-32 sm:h-40 object-contain rounded-lg mb-3 transition-transform duration-300 hover:scale-110"
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-center transition-colors duration-300 hover:text-amber-600">{restaurant.nome}</h3>
                                            <p className="mb-3 text-sm sm:text-base text-center line-clamp-2">{restaurant.descricao}</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1 text-xs sm:text-sm text-gray-700">
                                            <p>Endereço: {restaurant.endereco}</p>
                                            <p>Horário: {restaurant.horario_abertura} - {restaurant.horario_fechamento}</p>
                                            <p>Taxa de Entrega: {restaurant.taxa_entrega} ouros</p>
                                            <p>Tempo de Preparo: {restaurant.tempo_preparo}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-700 col-span-full">Nenhum restaurante encontrado para esse tipo.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Restaurants
