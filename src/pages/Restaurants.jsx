import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Restaurants = () => {
  const { restaurants } = useGlobalContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center w-full">Restaurantes</h2>
        <div className="grid grid-cols-1 gap-8">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{restaurant.nome}</h3>
              <p className="text-gray-700 mb-4">{restaurant.descricao}</p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Endereço:</strong> {restaurant.endereco}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Horário:</strong> {restaurant.horario_abertura} - {restaurant.horario_fechamento}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Taxa de Entrega:</strong> {restaurant.taxa_entrega} ouros
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Tempo de Preparo:</strong> {restaurant.tempo_preparo}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tipo:</strong> {restaurant.tipo.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Restaurants;
