import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 GRAYPIXELS. Todos os direitos reservados.</p>
        <div className="mt-4">
          <Link to="/about">
            <a className="mx-2 hover:underline">Sobre</a>
          </Link>
          <Link to="/contact">
            <a className="mx-2 hover:underline">Contato</a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer