import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Banner from "../components/Banner"
import Card from "../components/Card"
import Footer from "../components/Footer"
import PromoBanner from "../components/PromoBanner"
import RestaurantType from "../components/RestaurantType"
import Modal from "../components/Modal"
import Loading from "../components/Loading"
import { useAuth } from '../context/LoginContext'
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const [randomRecipeId, setRandomRecipeId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { user, updateBalance } = useAuth()
    const navigate = useNavigate()

    const handleOpenModal = (message) => {
        setModalMessage(message)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        navigate("/restaurants")
        setIsModalOpen(false)
    }

    useEffect(() => {
        setRandomRecipeId(Math.floor(Math.random() * 80) + 101)
        
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <Loading message="Carregando..." />
    }

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
                <div className="text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🎁</span>
                        </div>
                        <h2 className="text-2xl font-bold text-amber-800 mb-4">Parabéns!</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{modalMessage}</p>
                    </div>
                    <button 
                        onClick={handleCloseModal} 
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        Explorar Restaurantes
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default HomePage
