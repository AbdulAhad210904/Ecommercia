"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import ProductGrid from '../../components/ProductGrid';
import { fetchProductsByCategory } from '../../redux/products/productThunk';
import requireAuth from '../../../../requireAuth';


const ProductFilter = ({params: {categoryId}}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);
  console.log(products);

    // Clean up the image URLs
    const cleanedProducts = products?.map(product => {
        const imagesArray = product.images.map(image => image.replace(/^\[\"|\"\]$/g, ''));
        return {
          ...product,
          images: imagesArray
        };
      });
      const limitedProducts = cleanedProducts.slice(0,10);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <ProductGrid title={`Products for Category ${categoryId}`} products={cleanedProducts} />
    </>
  );
};

export default requireAuth(ProductFilter);
