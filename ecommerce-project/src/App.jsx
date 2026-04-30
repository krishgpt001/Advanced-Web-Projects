import { Routes,Route } from 'react-router'
// import { useState } from 'react'
import { HomePage } from './pages/homePage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route index element={<HomePage />} />
      {/* <Route path="checkout" element={<Checkout />} /> */}
    </Routes>
  )
}

export default App
