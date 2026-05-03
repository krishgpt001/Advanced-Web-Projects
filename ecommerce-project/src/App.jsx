import { Routes,Route } from 'react-router'
// import { useState } from 'react'
import { HomePage } from './pages/homePage'
import {  CheckoutPage } from './pages/CheckoutPage'
import {  OrderPage } from './pages/OrderPage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrderPage />} />
    </Routes>
  )
}

export default App
