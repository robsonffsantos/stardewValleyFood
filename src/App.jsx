import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipes from './pages/Recipes'
import Restaurants from './pages/Restaurants'
import About from './pages/About'
import Contact from './pages/Contact'
import RestaurantDetails from './pages/RestaurantsDetails'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Router>
      <div className="bg-gray-200 min-h-screen">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <ProtectedRoute path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
