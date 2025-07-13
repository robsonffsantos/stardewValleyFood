import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Banner from "../components/Banner"
import Card from "../components/Card"
import Footer from "../components/Footer"
import PromoBanner from "../components/PromoBanner"
import RestaurantType from "../components/RestaurantType"
import Modal from "../components/Modal"
import { useAuth } from '../context/LoginContext'
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const [randomRecipeId, setRandomRecipeId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const { user, updateBalance } = useAuth()
    const navigate = useNavigate()

    const handleOpenModal = () => {
        const lastClick = localStorage.getItem('lastPromoClick')
        const currentTime = new Date().getTime()

        if (user) {
            if (lastClick && currentTime - lastClick < 3600000) {
                setModalMessage("Você já resgatou seu bônus hoje.")
            } else {
                setModalMessage("Você ganhou 5000 ouros! Aqui estão nossos restaurantes para você aproveitar seus créditos!")
                updateBalance(5000)
                localStorage.setItem('lastPromoClick', currentTime)
            }
        } else {
            setModalMessage("Por favor, faça login para ganhar 5000 ouros.")
        }

        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        navigate("/restaurants")
        setIsModalOpen(false)
    }

    useEffect(() => {
        setRandomRecipeId(Math.floor(Math.random() * 80) + 101)
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <div className="flex-grow">
                <Banner />
                <h4 className="text-2xl sm:text-3xl font-semibold mt-4 sm:mt-6 text-center px-4">O que você procura?</h4>
                    <div className="mt-2 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
                        <RestaurantType type="Café da Manhã" />
                        <RestaurantType type="Almoço" />
                        <RestaurantType type="Jantar" />
                        <RestaurantType type="24h" />
                        <RestaurantType type="Bar" />
                    </div>
                        <div className="mt-4 mb-4 p-3 sm:p-4 flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 lg:space-x-8 justify-center">
                            <Link to="/restaurants" className="w-full sm:w-auto flex justify-center">
                                <Card title="Restaurantes"/>
                            </Link>
                            <Link to={`/recipes/${randomRecipeId}`} className="w-full sm:w-auto flex justify-center">
                                <Card title="Me mostre uma comida diferente hoje!" />
                            </Link>
                        </div>
                    </div>
                <PromoBanner onClick={handleOpenModal}/>
            <Footer />

            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Atenção:</h2>
                <p>{modalMessage}</p>
                <button onClick={handleCloseModal} className="mt-4 p-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors duration-200">Ver restaurantes</button>
            </Modal>
        </div>
    )
}

export default HomePage
