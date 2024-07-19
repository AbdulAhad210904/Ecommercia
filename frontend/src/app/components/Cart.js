import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartQuantity, deleteCartItem } from '../redux/cart/cartThunk';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getStripe from '@/app/components/get-stripe';
import { getUserIdFromToken } from '../authUtils';
import { FaSun, FaMoon } from 'react-icons/fa';


const Cart = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    // Load initial dark mode state from local storage or system preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const userId = getUserIdFromToken(); // Get the user ID from the token
  const [userEmail, setUserEmail] = useState(null);
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/fetchUser?userId=${userId}`);
        const userData = await response.json();
        setUserEmail(userData.email); // Update userEmail using useState
        // toast.success(`useremail: ${userData.email}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (userId) {
      fetchUserData();
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ userId, itemId, quantity: newQuantity }));
    
    // Update toast
    if (toastId) {
      toast.update(toastId, {
        render: 'Item quantity updated successfully!',
        type: 'success',
        autoClose: 2000,
      });
    } else {
      // Create a new toast if one does not exist
      const id = toast.success('Item quantity updated successfully!', {
        autoClose: 2000,
      });
      setToastId(id);
    }
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteCartItem({ userId, itemId }));
    if (toastId) {
      toast.update(toastId, {
        render: 'Item removed from cart successfully!',
        type: 'success',
        autoClose: 2000,
      });
    } else {
      // Create a new toast if one does not exist
      const id = toast.success('Item removed from cart successfully!', {
        autoClose: 2000,
      });
      setToastId(id);
    }
  };

  const fetchCheckoutSession = async () => {
    try {
      const email = userEmail;
      toast.success(`Email: ${email}`);
      const stripePromise = getStripe();
      const data = {
        amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 4.99,
        description: 'Order from Ecommercia',
        name: 'Ecommercia Order',
        image: 'https://img.freepik.com/free-vector/hand-drawn-installment-illustration_23-2149397096.jpg?w=740&t=st=1720252527~exp=1720253127~hmac=0f25fb5dc1bcb9b7132bfee4183b0a43028e27bba6f73aa8f0b4e0bec48a9e8e', // Replace with your image URL or item image URL
        email: email,
      };

      const response = await fetch('http://localhost:8080/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate checkout session');
      }

      const result = await response.json();
      const checkoutSessionId = result.checkoutSession.id;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionId,
      });

      if (error) {
        console.error('Error redirecting to Checkout:', error);
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <ToastContainer />
      <div className="text-center p-10">
      <div className="flex justify-around items-center ">
            <h1 className="font-bold text-4xl mb-4 font-mono dark:text-white ">Cart Items</h1>
            <button
              onClick={toggleDarkMode}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>      </div>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-700">
            <p>No products in cart</p>
          </div>
        ) : (
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
                    <p className="mt-2 text-sm text-gray-700">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
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
        )}
        {/* Subtotal */}
        {cartItems.length > 0 && (
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
                <p className="mb-1 text-lg font-bold text-black">${(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 4.99).toFixed(2)} </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button onClick={fetchCheckoutSession} className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-black">Check out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
