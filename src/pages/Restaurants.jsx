import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useGlobalContext } from '../context/GlobalContext'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Loading from "../components/Loading"

const Restaurants = () => {
    const { restaurants } = useGlobalContext()
    const location = useLocation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    const searchParams = new URLSearchParams(location.search)
    const tipo = searchParams.get('tipo')

    const filteredRestaurants = tipo 
        ? restaurants.filter(restaurant => restaurant.tipo.some(t => t.toLowerCase() === tipo)) 
        : restaurants

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 600)
        
        return () => clearTimeout(timer)
    }, [tipo])

    if (isLoading) {
        return <Loading message="Carregando restaurantes..." />
    }

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
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
                                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.nome}
                                        className="w-full h-32 sm:h-40 object-contain rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold mb-3 text-center transition-colors duration-300 hover:text-amber-600">{restaurant.nome}</h3>
                                            <p className="mb-4 text-sm sm:text-base text-center line-clamp-2">{restaurant.descricao}</p>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-gray-700">
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
