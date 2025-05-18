import React from 'react';
import { Link } from 'react-router-dom';
import useCategories from '../hooks/useCategories'; // Adjust path as needed

const HomePageCategories = () => {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold py-6 bg-gray-100 min-h-screen">
        Failed to load categories. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 md:px-10 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b-4 border-blue-500 inline-block pb-2 italic">
          Top Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => (
            <div
              key={category._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/categories"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300"
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageCategories;