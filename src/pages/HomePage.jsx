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
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleOpenModal = () => {
        setModalMessage("Você ganhou 5000 ouros! Aqui estão nossos restaurantes para você aproveitar seus créditos!")
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
                    <div className="mt-8 p-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                        <RestaurantType type="Café da Manhã" />
                        <RestaurantType type="Almoço" />
                        <RestaurantType type="Jantar" />
                        <RestaurantType type="24 H" />
                        <RestaurantType type="Bar" />
                    </div>
                        <div className="mt-10 mb-10 flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-8 justify-center align-items">
                            <Link to="/restaurants">
                                <Card title="Restaurantes"/>
                            </Link>
                            <Link to={`/recipes/${randomRecipeId}`}>
                                <Card title="Me mostre uma comida diferente hoje!" />
                            </Link>
                        </div>
                    </div>
                <PromoBanner onClick={handleOpenModal}/>
            <Footer />

            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Sucesso</h2>
                <p>{modalMessage}</p>
                <button onClick={handleCloseModal} className="mt-4 p-2 bg-blue-500 text-white rounded">Ver restaurantes</button>
            </Modal>
        </div>
    )
}

export default HomePage
