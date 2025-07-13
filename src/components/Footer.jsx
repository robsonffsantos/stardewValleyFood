import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-amber-800 text-white py-6 mt-8 shadow-lg">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} GRAYPIXEL. Todos os direitos reservados.</p>
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