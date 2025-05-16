import axios from 'axios'; // For making HTTP requests
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ExploreCourse = () => {
  // State to store fetched course data
  const [getCourse, setGetCourse] = useState([]);

  // Fetch course data from API
  const fetchCourse = async () => {
    try {
      const response = await axios.get('https://blog-1rng.onrender.com/mycourse');
      const data = response.data;
      setGetCourse(data);
    } catch (error) {
      console.error("Failed to fetch data of course");
    }
  };

  // Run fetchCourse once on mount
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <section className="pt-[100px] px-6 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Explore Courses</h1>
          <Link
            to="/createcourse"
            className="inline-block px-6 py-2 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition duration-200"
          >
            + Create Course
          </Link>
        </div>

        {/* Course list */}
        {getCourse.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getCourse.map((course, index) => (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-700 text-sm mb-3">{course.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p><span className="font-medium text-gray-600">Faculty:</span> {course.faculty}</p>
                  <p><span className="font-medium text-gray-600">Created:</span> {new Date(course.createdAt).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-12">Loading courses...</p>
        )}
      </div>
    </section>
  );
};

export default ExploreCourse;
