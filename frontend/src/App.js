import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

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
import Dashboard from './components/admin/Dashboard';
import ProductListAdm from './components/admin/ProductListAdm'
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersListAdm from './components/admin/OrdersListAdm';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

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
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/stripeapi`);

      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, [])

  return (
      <div className="App">
        <Header />
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

            <Route path="/dashboard" element={ <ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>} />
            <Route path="/admin/products" element={ <ProtectedRoute isAdmin={true}> <ProductListAdm /> </ProtectedRoute>} />
            <Route path="/admin/product" element={ <ProtectedRoute isAdmin={true}> <NewProduct /> </ProtectedRoute>} />
            <Route path="/admin/product/:id" element={ <ProtectedRoute isAdmin={true}> <UpdateProduct /> </ProtectedRoute>} />
            <Route path="/admin/orders" element={ <ProtectedRoute isAdmin={true}> <OrdersListAdm /> </ProtectedRoute>} />
            <Route path="/admin/order/:id" element={ <ProtectedRoute isAdmin={true}> <ProcessOrder /> </ProtectedRoute>} />
            <Route path="/admin/users" element={ <ProtectedRoute isAdmin={true}> <UsersList /> </ProtectedRoute>} />
            <Route path="/admin/user/:id" element={ <ProtectedRoute isAdmin={true}> <UpdateUser /> </ProtectedRoute>} />
            <Route path="/admin/reviews" element={ <ProtectedRoute isAdmin={true}> <ProductReviews /> </ProtectedRoute>} />
          </Routes>
        <Footer />
      </div>
  );
}

export default App;
