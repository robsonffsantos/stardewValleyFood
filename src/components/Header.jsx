import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from '../context/LoginContext'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold">Stardew Valley Food</h1>
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <img 
                src={user.foto} 
                alt={`${user.name} profile`} 
                className="w-8 h-8 rounded-full mr-2" 
              />
              <span className="mr-4">{user.name}</span>
              <span className="font-semibold">{`Saldo: R$ ${user.saldo.toFixed(2)}`}</span>
            </>
          ) : (
            <>
              <Link to="/login">
                <button 
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Login
                </button>
              </Link>
              <span className="mx-2 text-xs">ou</span>
              <Link to="/register">
                <span className="hover:underline text-xs">Cadastre-se</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header