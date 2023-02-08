import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import ProductList from './components/product/ProductList';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import OrdersList from './components/order/OrdersList';
import OrderDetails from './components/order/OrderDetails';

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions'
import store from './store'
import axios from 'axios'

import './App.css';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={ <ProtectedRoute> <Shipping /> </ProtectedRoute>} />
            <Route path="/order/confirm" element={ <ProtectedRoute> <ConfirmOrder /> </ProtectedRoute>} />
            <Route path="/payment" element={ 
              <ProtectedRoute> 
              {stripeApiKey &&
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment /> 
                </Elements>
              }
              </ProtectedRoute>} />
            <Route path="/success" element={ <ProtectedRoute> <OrderSuccess /> </ProtectedRoute>} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/me" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path="/me/update" element={ <ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />
            <Route path="/password/update" element={ <ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} />
            <Route path="/orders/me" element={ <ProtectedRoute> <OrdersList /> </ProtectedRoute>} />
            <Route path="/order/:id" element={ <ProtectedRoute> <OrderDetails /> </ProtectedRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
