import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Banner from "../components/Banner"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import Footer from "../components/Footer"
import PromoBanner from "../components/PromoBanner"
import RestaurantType from "../components/RestaurantType"

const HomePage = React.FC = () => {
    const [randomRecipeId, setRandomRecipeId] = useState(null)

    useEffect(() => {
        setRandomRecipeId(Math.floor(Math.random() * 80) + 101);
      }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <div className="flex-grow">
                <Banner />
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                        <RestaurantType type="Café da Manhã" />
                        <RestaurantType type="Almoço" />
                        <RestaurantType type="Jantar" />
                        <RestaurantType type="24 H" />
                        <RestaurantType type="Bar" />
                    </div>
                        <div className="mt-16 flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8 justify-center align-items">
                            <Link to="/restaurants">
                                <Card title="Restaurantes"/>
                            </Link>
                            <Link to={`/recipes/${randomRecipeId}`}>
                                <Card title="Me mostre uma comida diferente hoje!" />
                            </Link>
                        </div>
                    </div>
                <PromoBanner />
            <Footer />
        </div>
    )
}

export default HomePage