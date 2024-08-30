import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/LoginContext"
import farmerImage from "../assets/farmer.png" // Importe a imagem aqui

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold">Stardew Valley Food</h1>
        </Link>
        <div>
          {user ? (
            <Link to='/profile'>
            <div className="flex items-center">              
                <img src={farmerImage} alt="Usuário" className="w-8 h-8 rounded-full mr-2 bg-white" />
                <div>
                  <div className="mr-4">{user.name}</div>
                  <div className="mr-4">Saldo: {user.balance} ouros</div>
                </div>              
              </div>
              </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
                  Login
                </button>
              </Link>
              <a className="mx-2 text-xs">ou</a>
              <Link to="/register">
                <a className="hover:underline text-xs">Cadastre-se</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

