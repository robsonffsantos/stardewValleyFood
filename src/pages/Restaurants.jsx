import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Restaurants = React.FC = () => {
    const { restaurants } = useGlobalContext();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-6">
                <h2 className="text-3xl font-semibold mb-6 text-center">Restaurantes</h2>
                <div className="grid grid-cols-1 gap-8">
                    {restaurants.map((restaurant, index) => (
                        <div
                            key={restaurant.id}
                            className={`flex flex-col md:flex-row ${
                                index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            } bg-white rounded-lg shadow-md p-6`}
                        >
                            <img
                                src={restaurant.image}
                                alt={restaurant.nome}
                                className="w-full md:w-1/4 h-auto object-contain rounded-lg"
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
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Restaurants;

