import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 GRAYPIXELS. Todos os direitos reservados.</p>
        <div className="mt-4">
          <a href="/about" className="mx-2 hover:underline">Sobre</a>
          <a href="/contact" className="mx-2 hover:underline">Contato</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer