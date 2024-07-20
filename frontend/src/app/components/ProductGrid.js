import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartThunk';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserIdFromToken } from '../authUtils';
import { FaSun, FaMoon } from 'react-icons/fa';


const ProductGrid = ({ title, products }) => {
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
  const [addedProductId, setAddedProductId] = useState(null);
  
  const handleAddToCart = (product) => {
    const userId = getUserIdFromToken();
    const productToAdd = {
      productId: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
    };
    dispatch(addToCart({ userId, productData: productToAdd }))
      .then(() => {
        setAddedProductId(product.id); 
        setTimeout(() => {
          setAddedProductId(null); 
        }, 500);
      })
      .catch((error) => {
        toast.error('Failed to add product to cart.');
      });
  };

  return (
    <div className="bg-gray-100  dark:bg-gray-800">
      <ToastContainer />
      <div className="text-center p-10">
      <div className="flex justify-around items-center">
            <h1 className="font-bold text-4xl mb-4 font-mono dark:text-white">{title}</h1>
            <button
              onClick={toggleDarkMode}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
      </div>

      <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products?.map((product) => (
          <div key={product.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl ">
            <img src={product.images[0]} alt={product.title} className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">Product Name</span>
              <p className="text-lg font-bold text-black truncate block capitalize ">{product.title}</p>
              <div className="flex items-center">
                <p className={`text-lg font-semibold text-black cursor-auto my-3 w-24 truncate`} title={product.price}>
                  ${product.price}
                </p>
                <div className="ml-auto">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      addedProductId === product.id ? 'bg-green-600 hover:bg-green-600' : 'bg-blue-700  hover:bg-blue-800'
                    } focus:ring-4 focus:outline-none focus:ring-blue-300`}
                  >
                    {addedProductId === product.id ? 'Added to cart' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductGrid;