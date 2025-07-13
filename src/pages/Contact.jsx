import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-4 sm:p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 mb-4">
                            Entre em Contato
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600">
                            Tem alguma dúvida ou sugestão? Entre em contato conosco!
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-amber-700">Informações de Contato</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="text-amber-600 font-bold mr-3">📧</span>
                                <span className="text-gray-700">Email: contato@stardewvalleyfood.com</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-amber-600 font-bold mr-3">📞</span>
                                <span className="text-gray-700">Telefone: (555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-amber-600 font-bold mr-3">📍</span>
                                <span className="text-gray-700">Endereço: Vila dos Pelicanos, Stardew Valley</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-amber-600 font-bold mr-3">🕒</span>
                                <span className="text-gray-700">Horário de Atendimento: Segunda a Sexta, 8h às 18h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact