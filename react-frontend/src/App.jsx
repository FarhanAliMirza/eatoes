import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  )
}

export default App
