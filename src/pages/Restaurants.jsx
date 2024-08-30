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
            <div className="flex-grow p-4">
                <h2 className="text-3xl font-semibold mb-6 text-center">Restaurantes</h2>
                <div className="grid gap-4 pl-4 pr-4">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
                                <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                                    {restaurant.id % 2 !== 0 ? (
                                        <>
                                            <img
                                                src={restaurant.image}
                                                alt={restaurant.nome}
                                                className="w-full md:w-1/3 h-60 object-contain rounded-lg"
                                            />
                                            <div className="flex flex-col justify-center md:w-2/3 p-4">
                                                <h3 className="text-xl font-bold mb-2">{restaurant.nome}</h3>
                                                <p className="mb-2">{restaurant.descricao}</p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    Endereço: {restaurant.endereco}
                                                </p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    Horário: {restaurant.horario_abertura} - {restaurant.horario_fechamento}
                                                </p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    Taxa de Entrega: {restaurant.taxa_entrega} ouros
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    Tempo de Preparo: {restaurant.tempo_preparo}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col justify-center md:w-2/3 p-4">
                                                <h3 className="text-xl font-bold mb-2">{restaurant.nome}</h3>
                                                <p className="mb-2">{restaurant.descricao}</p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    Endereço: {restaurant.endereco}
                                                </p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    Horário: {restaurant.horario_abertura} - {restaurant.horario_fechamento}
                                                </p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    Taxa de Entrega: {restaurant.taxa_entrega} ouros
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    Tempo de Preparo: {restaurant.tempo_preparo}
                                                </p>
                                            </div>
                                            <img
                                                src={restaurant.image}
                                                alt={restaurant.nome}
                                                className="w-full md:w-1/3 h-60 object-contain rounded-lg"
                                            />
                                        </>
                                    )}
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
