import React from 'react'
import { useAuth } from '../context/LoginContext'
import farmerImage from '../assets/farmer.png'
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return <div className="text-center">Por favor, faça login para ver seu perfil.</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
            <Link to="/">
                <h2 className="text-2xl hover:bg-blue-700 mb-4 text-center rounded bg-blue-500 text-white p-4">
                    Stardew Valley Food
                </h2>
            </Link>
            <h2 className="text-2xl text-center rounded p-6">Meu perfil</h2>
                <img src={farmerImage} alt="Usuário" className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
                    <p className="text-center text-lg text-gray-700">Saldo: R$ {user.balance}</p>
                <Link to="/restaurants">
                    <h2 className="text-2xl hover:bg-blue-700 mt-4 text-center rounded bg-blue-500 text-white p-4">
                        Ver restaurantes
                    </h2>
                </Link>
            </div>
            </div>
        </div>
        <Footer />   
    </div>
  )
}

export default Profile
