import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useGlobalContext } from '../context/GlobalContext'
import Header from "../components/Header"
import Footer from "../components/Footer"

const Restaurants = () => {
    const { restaurants } = useGlobalContext()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    const tipo = searchParams.get('tipo')

    const filteredRestaurants = tipo 
        ? restaurants.filter(restaurant => restaurant.tipo.some(t => t.toLowerCase() === tipo)) 
        : restaurants

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header />
            <div className="flex-grow p-3 sm:p-4">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Restaurantes</h2>
                <div className="grid gap-3 sm:gap-4">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
                                <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col md:flex-row items-center gap-3 sm:gap-4">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.nome}
                                        className="w-full md:w-1/3 h-40 sm:h-48 md:h-60 object-contain rounded-lg order-1 md:order-none"
                                    />
                                    <div className="flex flex-col justify-center md:w-2/3 p-2 sm:p-4 order-2 md:order-none">
                                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-center md:text-left">{restaurant.nome}</h3>
                                        <p className="mb-2 text-sm sm:text-base text-center md:text-left">{restaurant.descricao}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
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
                        <p className="text-center text-gray-700">Nenhum restaurante encontrado para esse tipo.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Restaurants
