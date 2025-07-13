import React from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-4 sm:p-6 md:p-8">
                <div className="max-w-4xl mx-auto">

                    <div className="text-center mb-8">
                        <Link to="/">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 mb-4 hover:text-amber-700 transition-colors duration-300">
                                Stardew Valley Food
                            </h1>
                        </Link>
                        <p className="text-lg sm:text-xl text-gray-600">
                            Sua plataforma de delivery inspirada no universo de Stardew Valley
                        </p>
                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-amber-700">Sobre o Projeto</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            O <strong>Stardew Valley Food</strong> é uma aplicação web de delivery de comida inspirada no popular jogo Stardew Valley. 
                            O projeto simula uma plataforma onde os moradores da Vila dos Pelicanos podem pedir comida dos restaurantes locais.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Desenvolvido com React, TypeScript e Tailwind CSS, este projeto demonstra conceitos modernos de desenvolvimento web, 
                            incluindo gerenciamento de estado, roteamento, responsividade e design de interface do usuário.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Todas as receitas, restaurantes e personagens são baseados no universo de Stardew Valley, 
                            criando uma experiência imersiva e nostálgica para os fãs do jogo.
                        </p>
                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-amber-700">Funcionalidades Principais</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Sistema de autenticação de usuários</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Catálogo de restaurantes por categoria</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Filtros por tipo de refeição</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Detalhes completos dos restaurantes</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Cardápio com receitas autênticas</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Sistema de carrinho de compras</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Interface responsiva para mobile</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-amber-600 font-bold mr-2">•</span>
                                    <span className="text-gray-700">Animações e efeitos visuais</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-amber-700">Como Testar e Usar</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-amber-600">1. Primeiro Acesso</h3>
                                <p className="text-gray-700 mb-2">Na primeira visita, você receberá um bônus de 5000 ouros para testar a plataforma!</p>
                                <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
                                    <p className="text-sm text-amber-800">
                                        <strong>Dica:</strong> Clique no banner promocional na página inicial para receber seu bônus.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-amber-600">2. Navegação</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Use o menu "O que você procura?" para filtrar restaurantes por tipo</li>
                                    <li>Clique em "Restaurantes" para ver todos os estabelecimentos</li>
                                    <li>Explore "Me mostre uma comida diferente" para descobrir receitas aleatórias</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-amber-600">3. Fazer Pedidos</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Clique em um restaurante para ver seu cardápio completo</li>
                                    <li>Use os filtros de categoria para encontrar pratos específicos</li>
                                    <li>Clique em "Comprar" para adicionar itens ao carrinho</li>
                                    <li>Ajuste a quantidade antes de finalizar</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-amber-600">4. Carrinho e Checkout</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Acesse o carrinho pelo ícone no cabeçalho</li>
                                    <li>Revise seus itens e quantidades</li>
                                    <li>Clique em "Finalizar Compra" para completar o pedido</li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-amber-700">Dados do Projeto</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                                <div className="text-2xl font-bold text-amber-600">6</div>
                                <div className="text-sm text-gray-600">Restaurantes</div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                                <div className="text-2xl font-bold text-amber-600">88</div>
                                <div className="text-sm text-gray-600">Receitas</div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                                <div className="text-2xl font-bold text-amber-600">5</div>
                                <div className="text-sm text-gray-600">Categorias</div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                                <div className="text-2xl font-bold text-amber-600">100%</div>
                                <div className="text-sm text-gray-600">Responsivo</div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-amber-700">Tecnologias Utilizadas</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-800">React</div>
                                <div className="text-xs text-gray-600">Frontend</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-800">TypeScript</div>
                                <div className="text-xs text-gray-600">Tipagem</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-800">Tailwind CSS</div>
                                <div className="text-xs text-gray-600">Estilização</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-800">React Router</div>
                                <div className="text-xs text-gray-600">Navegação</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About