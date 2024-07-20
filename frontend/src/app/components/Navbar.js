"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getUserIdFromToken } from '../authUtils';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../redux/cart/cartThunk';
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname(); 
  const isActive = (path) => pathname === path ? 'bg-gray-900 text-white dark:bg-gray-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-600';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const userId = getUserIdFromToken();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const cartCounter = useSelector((state) => state.cart.counter); 

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [ dispatch, userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cartCounter');
    router.push('/login');
  };

  const openProfile = () => {
    router.push(`/profile/${userId}`);
  };

  const [blink, setBlink] = useState(false);

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-300 dark:hover:bg-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link 
                  href="/categories"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/categories')}`}
                  aria-current="page"
                >
                  Categories
                </Link>
                <Link
                  href="/allproducts"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/allproducts')}`}
                >
                  All Products
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a
              className={`relative me-4 text-neutral-600 dark:text-white ${blink ? 'blink' : ''}`}
              href="/cart"
            >
              <span className="[&>svg]:w-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </span>
              {cartCounter > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartCounter}
                </span>
              )}
            </a>
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Logout
            </button>
            <button
              onClick={openProfile}
              className="relative ml-3 inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
            >
              Profile
            </button>

          </div>
        </div>
      </div>
      <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/categories"
            className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/categories')}`}
            aria-current="page"
          >
            Categories
          </Link>
          <Link
            href="/allproducts"
            className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/allproducts')}`}
          >
            All Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
