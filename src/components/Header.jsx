import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/LoginContext"
import { useGlobalContext } from "../context/GlobalContext"
import farmerImage from "../assets/farmer.png"

const Header = () => {
  const { user } = useAuth()
  const { getCartItems } = useGlobalContext()
  const cartItems = getCartItems()
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold">Stardew Valley Food</h1>
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link to='/cart'>
                <div className="relative flex items-center cursor-pointer">
                  <img
                    src={farmerImage}
                    alt="Usuário"
                    className="w-8 h-8 rounded-full mr-2 bg-white"
                  />
                  {totalItems > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </div>
                  )}
                  <div className="ml-2">
                    <div className="mr-4">{user.name}</div>
                    <div className="mr-4">Saldo: {user.balance} ouros</div>
                  </div>
                </div>
              </Link>
            </>
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

