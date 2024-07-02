"use client"
// Categories.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryData } from '../redux/actions/categoryActions';
import Navbar from '../components/Navbar';
import CategoryGrid from '../components/CategoryGrid';
import { fetchProductsByCategory } from '../redux/actions/productActions';
import { useRouter } from 'next/navigation';

const Categories = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Ensure useRouter is inside the component
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoryData());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    dispatch(fetchProductsByCategory(categoryId));
    router.push(`/productfilter/${categoryId}`); // Use router.push to navigate
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const limitedCategories = categories.slice(0, 6);
  return (
    <>
      <Navbar />
      <CategoryGrid title="Categories" categories={limitedCategories} onClick={handleCategoryClick} />
    </>
  );
};

export default Categories;
