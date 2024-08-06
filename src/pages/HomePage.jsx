import React from "react"
import Header from "../components/Header"
import Banner from "../components/Banner"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import Footer from "../components/Footer"
import PromoBanner from "../components/PromoBanner"
import RestaurantType from "../components/RestaurantType"

const HomePage = React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <div className="flex-grow">
                <Banner />
                    <div className="p-4 sm:p-8">
                    <SearchBar />
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        <RestaurantType type="Café da Manhã" />
                        <RestaurantType type="Almoço" />
                        <RestaurantType type="Janta" />
                        <RestaurantType type="24 H" />
                        <RestaurantType type="Bar" />
                    </div>
                        <div className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 justify-center">
                            <Card title="Restaurantes" />
                            <Card title="Ainda não sei o que comer" />
                        </div>
                    </div>
                </div>
                <PromoBanner />
            <Footer />
        </div>
    )
}

export default HomePage