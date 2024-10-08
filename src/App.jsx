import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import RecipeDetail from './pages/Recipes'
import Restaurants from './pages/Restaurants'
import About from './pages/About'
import Contact from './pages/Contact'
import RestaurantDetails from './pages/RestaurantsDetails'
import Profile from './pages/Profile'
import Cart from './components/Cart'

const App = () => {
  return (
    <Router>
      <div className="bg-gray-200 min-h-screen">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/recipes/:id' element={<RecipeDetail />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
