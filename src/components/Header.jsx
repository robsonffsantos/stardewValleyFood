import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/LoginContext"
import { useGlobalContext } from "../context/GlobalContext"
import farmerImage from "../assets/farmer.png"
import cartIcon from "../assets/cartIcon.png"

const Header = () => {
  const { user } = useAuth()
  const { getCartItems } = useGlobalContext()
  const cartItems = getCartItems()
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="bg-amber-700 text-white p-3 sm:p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <Link to="/">
          <h1 className="text-lg sm:text-xl font-bold text-center sm:text-left">Stardew Valley Food</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center">
                <img
                  src={farmerImage}
                  alt="Usuário"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-1 sm:mr-2 bg-white"
                />
                <div className="hidden sm:block ml-2">
                  <div className="mr-4 text-sm">{user.name}</div>
                  <div className="mr-4 text-xs">Saldo: {user.balance} ouros</div>
                </div>
                <div className="sm:hidden text-xs">
                  <div>{user.name}</div>
                  <div>{user.balance} ouros</div>
                </div>
              </Link>
              <Link to="/cart" className="relative flex items-center">
                <img
                  src={cartIcon}
                  alt="Carrinho"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
                {totalItems > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-amber-700 px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-amber-50 font-semibold text-sm sm:text-base">
                  Login
                </button>
              </Link>
              <span className="mx-1 sm:mx-2 text-xs">ou</span>
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
