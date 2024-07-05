import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartThunk';

const ProductGrid = ({ title, products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const userId = '668279981f51617908376202'; // Replace with actual userId
    const productToAdd = {
      productId: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
    };
    dispatch(addToCart(userId, productToAdd));
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map((product) => (
              <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="p-8 rounded-t-lg" src={product.images[0]} alt={product.title} />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
