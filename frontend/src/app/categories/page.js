"use client"

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryData } from '../redux/actions/categoryActions';
import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  console.log(categories);

  useEffect(() => {
    dispatch(getCategoryData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const imitedCategories = categories.slice(0, 6);
  return (
    <>
      <Navbar />
      <CategoryGrid title="Categories" categories={imitedCategories} />
    </>
  );
};

export default Categories;
