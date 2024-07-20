"use client"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryData } from '../redux/categories/categoryThunk';
import Navbar from '../components/Navbar';
import CategoryGrid from '../components/CategoryGrid';
import { fetchProductsByCategory } from '../redux/products/productThunk';
import { useRouter } from 'next/navigation';
import requireAuth from '../../../requireAuth';


const Categories = () => {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoryData());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    dispatch(fetchProductsByCategory(categoryId));
    router.push(`/productfilter/${categoryId}`); 
  };



  const limitedCategories = categories.slice(0, 6);
  return (
    <>
      <Navbar />
      <CategoryGrid title="Categories" categories={limitedCategories} onClick={handleCategoryClick} />
    </>
  );
};

export default requireAuth(Categories);
