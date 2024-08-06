import React from "react"
import Header from "../components/Header"
import Banner from "../components/Banner"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import Footer from "../components/Footer"

const HomePage = React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <div className="flex-grow">
                <Banner />
                    <div className="p-4 sm:p-8">
                    <SearchBar />
                        <div className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                            <Card title="Restaurantes" />
                            <Card title="Ainda não sei o que comer" />
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default HomePage