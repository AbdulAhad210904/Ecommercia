"use client"
import React from 'react';
import Cart from '../components/Cart';
import Navbar from '../components/Navbar';
import requireAuth from '../../../requireAuth';

const CartPage = () => {
  return (
    <div>
        <Navbar />
        <Cart />
    </div>
  );
}

export default requireAuth(CartPage);
