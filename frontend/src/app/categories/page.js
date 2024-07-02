"use client"

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryData } from '../redux/actions/categoryActions';
import Navbar from "../components/Navbar";

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
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {imitedCategories.map((category) => (
                <div key={category.slug} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={category.url}>
                      <span className="absolute inset-0"></span>
                      {category.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {category.name} products
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
