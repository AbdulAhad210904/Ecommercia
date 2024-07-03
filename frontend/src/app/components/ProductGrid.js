import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const ProductGrid = ({ title, products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    product.quantity = 1;
    product.image=product.images[0];
    console.log(product);
    const userId = '668279981f51617908376202'; // Replace with actual userId
    // Create the product object with required properties
    const productToAdd = {
      productId: product.id,
      title: product.title,
      image: product.images[0], // Assuming product has an array of images and taking the first one
      price: product.price,
      quantity: 1, // Assuming default quantity is 1
    };
    dispatch(addToCart(userId, productToAdd));
  };

  return (
    <div className="bg-gray-100">
      {/* Your existing product grid code */}
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
              <button onClick={() => handleAddToCart(product)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
