import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";

const FeatureCourse = () => {
  const [getCourse, setGetCourse] = useState([]);

  // Fetch course data from API
  const fetchCourse = async () => {
    try {
      const response = await axios.get("https://blog-1rng.onrender.com/mycourse");
      const data = response.data;
      console.log("API Response:", data); // Log to inspect structure
      // Handle cases where data might be an object with a 'data' key or the array itself
      setGetCourse(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Failed to fetch data of course:", error);
    }
  };

  // Run fetchCourse once on mount
  useEffect(() => {
    fetchCourse();
  }, []);

  // Limit to first 3 courses
  const featuredCourses = getCourse.slice(0, 3);

  return (
    <section className="p-6 md:p-10 bg-gray-50">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Featured Courses</h1>
          <p className="text-gray-600 mt-2">
            Handpicked courses by our team to help you get started
          </p>
        </div>
        <Link
          to="/explorecourse"
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-4 md:mt-0"
        >
          View All Courses
        </Link>
      </div>

      {/* Featured Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {featuredCourses.map((course) => (
          <div
            key={course._id || Math.random().toString(36).substr(2, 9)} // Use _id with fallback
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative">
              <img
                src={course.image || "https://via.placeholder.com/300x200"}
                alt={course.title?.toString() || "Course Image"}
                className="w-full h-40 object-cover"
              />
              <span className="absolute top-2 left-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                {course.category?.toString() || "Unknown"}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{course.title?.toString() || "Untitled Course"}</h2>
              <p className="text-sm text-gray-600 mt-1">Instructor: {course.instructor?.toString() || "Unknown"}</p>
              <p className="text-sm text-gray-500 mt-1">Duration: {course.duration?.toString() || "N/A"}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-gray-900">${course.price?.toString() || "49.99"}</span>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCourse;