import React, { useEffect, useState} from 'react'
import table1 from '../assets/table_1.png'
import table2 from '../assets/table_2.png'
import table3 from '../assets/table_3.png'
import table4 from '../assets/table_4.png'

const images = [table1, table2, table3, table4]

const Banner = React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-56 w-full flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-500"
        style={{ backgroundImage: `url(${images[currentImage]})`, display: "block", width: "50%", marginLeft: "auto", marginRight: "auto" }}
      />
      <h2 className="relative text-2xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded">
        Sua comida a um clique de distância
      </h2>
    </div>
  )
}

export default Banner