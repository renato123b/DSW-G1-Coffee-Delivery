import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Cart } from './pages/Cart'
import { Home } from './pages/Home'
import { Success } from './pages/Success'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order/:orderId/success" element={<Success />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
