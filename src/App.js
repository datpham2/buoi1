import React from 'react'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import './styles.css'
import StockDetail from './pages/stockDetail/StockDetail'
import StockNews from './pages/news/StockNews'

export default function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quote/:symbol' element={<StockDetail />} />
          
          {/*
          <Route path='/stock' element={<Stock />} />
          <Route path='/stock/:symbol/chart' element={<StockChart />} /><Route path='/stock/:symbol/news' element={<StockNews />} />
          } /> */}
        </Routes>
      </HashRouter>
    </div>
  )
}
