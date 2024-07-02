"use client";
import React from 'react';
import Link from 'next/link'; // Import Link from next/link for client-side navigation

const CategoryGrid = ({ title, categories, onClick }) => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {categories?.map((category) => (
              <div key={category.slug} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{category.name} products</p>
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
    </div>
  );
};

export default CategoryGrid;
