import React from "react"

const Header = React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Stardew Valley Food</h1>
            <div>
              <button 
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Login
              </button>
              <a className="mx-2 text-xs">ou</a>
              <a href="/register" className="hover:underline text-xs">cadastre-se</a>
            </div>
          </div>
        </header>
    )
}

export default Header