"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartQuantity, deleteCartItem } from '../redux/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const userId = '668279981f51617908376202'; // Replace with actual userId

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity(userId, itemId, quantity));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteCartItem(userId, itemId));
  };

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold text-black">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div key={item.productId} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={item.image}
                alt={item.title}
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                  <p className="mt-1 text-xs text-gray-700">{item.description}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 text-black"> - </button>
                    <input className="h-8 w-8 border bg-white text-center text-xs text-black outline-none" type="number" value={item.quantity} readOnly />
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 text-black"> + </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-black">${item.price}</p>
                    <svg
                      onClick={() => handleDeleteItem(item.productId)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Subtotal */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold text-black">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold text-black">${(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 4.99).toFixed(2)} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
