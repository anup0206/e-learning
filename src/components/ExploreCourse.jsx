import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ExploreCourse = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://blog-1rng.onrender.com/mycourse');
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data); // Default view
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('https://blog-1rng.onrender.com/mycourse/category/getCoursesByCategory');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Category fetch error:', err);
    }
  };


  useEffect(() => {
    fetchCourses();
    fetchCategories();
    createCourse();
  }, []);

  // Handle filter by category
  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => course.category?.toLowerCase() === category.toLowerCase());
      setFilteredCourses(filtered);
    }
  };

  return (
    <div className="p-8 pt-20 h-screen">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>

      {/* Error + Loading */}
      {loading && <p className="text-purple-600">Loading courses...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => handleFilter('All')}
          className={`px-4 py-2 rounded ${
            selectedCategory === 'All' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.length === 0 && (
          <span className="text-gray-500 italic">No categories available</span>
        )}
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* No courses found in selected category */}
      {!loading && !error && filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 text-xl">🚫 No courses found in "{selectedCategory}".</p>
      )}

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="border p-4 rounded shadow hover:shadow-md">
            <img
              src={course.image || 'https://via.placeholder.com/300x180.png?text=Course+Image'}
              alt={course.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-bold text-purple-700">{course.title}</h2>
            <p className="text-sm text-gray-600 my-2">{course.description}</p>
            <p className="text-yellow-500">⭐ {course.rating || '4.5'} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCourse;
