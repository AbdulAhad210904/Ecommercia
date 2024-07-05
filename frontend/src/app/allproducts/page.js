"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '@/app/redux/products/productThunk';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import requireAuth from '../../../requireAuth';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
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

export default requireAuth(AllProducts);
