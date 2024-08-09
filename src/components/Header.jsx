import React from "react"
import { Link } from "react-router-dom"

const Header = React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/">
              <h1 className="text-xl font-bold">Stardew Valley Food</h1>
            </Link>
            <div>
              <Link to="/login">
                <button 
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Login
                </button>
              </Link>
              <a className="mx-2 text-xs">ou</a>
              <Link to="/register">
                <a className="hover:underline text-xs">cadastre-se</a>
              </Link>
            </div>
          </div>
        </header>
    )
}

export default Header