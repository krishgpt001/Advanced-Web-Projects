import { Routes,Route } from 'react-router'
// import { useState } from 'react'
import { HomePage } from './pages/homePage'
import {  CheckoutPage } from './pages/CheckoutPage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
