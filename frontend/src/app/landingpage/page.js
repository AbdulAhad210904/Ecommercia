"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductData } from '@/app/redux/actions/productActions';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products); // Ensure 'products' matches your rootReducer

  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Clean up the image URLs
  const cleanedProducts = products?.map(product => {
    const imagesArray = product.images.map(image => image.replace(/^\[\"|\"\]$/g, ''));
    return {
      ...product,
      images: imagesArray
    };
  });
  const limitedProducts = cleanedProducts.slice(0, 20);

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {limitedProducts?.map(product => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img src={product.images[0]}  alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
