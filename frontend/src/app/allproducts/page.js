"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductData } from '@/app/redux/actions/productActions';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';

const AllProducts = () => {
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
      <ProductGrid title="All Products" products={limitedProducts} />
    </>
  );
};

export default AllProducts;
