"use client";
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const CategoryGrid = ({ title, categories, onClick }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    // Load initial dark mode state from local storage or system preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`bg-gray-100 dark:bg-gray-800`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center p-10">
        <div className="flex justify-around items-center">
            <h1 className="font-bold text-4xl mb-4 font-mono dark:text-white">{title}</h1>
            <button
              onClick={toggleDarkMode}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {categories?.map((category) => (
            <div key={category.slug} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white dark:bg-gray-900">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-serif">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{category.name} products</p>
              </div>
              {onClick && (
                <button
                  onClick={() => onClick(category.id)}
                  className="absolute inset-0 z-10 w-full h-full cursor-pointer opacity-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
