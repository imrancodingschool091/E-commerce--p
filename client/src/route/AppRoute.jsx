import React from 'react'
import {Routes,Route} from "react-router-dom"
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import ProductList from '../pages/product/ProductList'
import ProductDetails from '../pages/product/ProductDetails'
import SearchResult from '../pages/product/SearchResult'
import HomePage from '../pages/home/HomePage'
import CheckoutPage from '../pages/product/CheckoutPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import CartPage from '../pages/product/CartPage'
import OrdersPage from '../pages/product/OrdersPage'

function AppRoute() {
  
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
             <Route path='/products' element={<ProductList/>}/>
             <Route path="/search" element={<SearchResult />} />
               <Route path="/cart" element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />

        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />
             <Route path="/products/:id" element={<ProductDetails />} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

        </Routes>
      
    </div>
  )
}

export default AppRoute
