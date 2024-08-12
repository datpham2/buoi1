import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import './styles.css'
import StockDetail from './pages/stockDetail/StockDetail'
import StockNews from './pages/news/StockNews'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quote/:symbol' element={<StockDetail />} />
          
          {/* // a few routes for a stock site 
          <Route path='/stock' element={<Stock />} />
          <Route path='/stock/:symbol/chart' element={<StockChart />} /><Route path='/stock/:symbol/news' element={<StockNews />} />
          } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
