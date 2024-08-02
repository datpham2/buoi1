import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* // a few routes for a stock site 
          <Route path='/stock' element={<Stock />} />
          <Route path='/stock/:symbol' element={<StockDetail />} />
          <Route path='/stock/:symbol/chart' element={<StockChart />} />
          <Route path='/stock/:symbol/news' element={<StockNews />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
