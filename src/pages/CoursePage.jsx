import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CoursePage = () => {
  const [getCourse, setGetCourse] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchCourse = async () => {
    try {
      const response = await axios.get("https://blog-1rng.onrender.com/mycourse");
      const data = response.data;
      setGetCourse(Array.isArray(data) ? data : data.data || []);
      setLoaded(true);  // trigger fade-in after data is ready
    } catch (error) {
      console.error("Failed to fetch data of course:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const featuredCourses = getCourse.slice(0, 3);

  return (
    <section
      className={`p-6 md:p-12 bg-gray-50 min-h-screen
        transition-opacity transition-transform duration-700 ease-out
        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 inline-block pb-2 italic">
         Explore Course
      </h2>
          <p className="text-gray-600 mt-2 max-w-md">
            Handpicked courses by our team to help you get started
          </p>
        </div>
         <Link
          to="/explorecourse"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300"
        >
          View All Courses →
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredCourses.map((course) => (
          <div
            key={course._id || Math.random().toString(36).substr(2, 9)}
            className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.03] transition-transform transition-shadow duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative h-40 overflow-hidden rounded-t-lg">
              <img
                src={course.image || "https://via.placeholder.com/300x200"}
                alt={course.title?.toString() || "Course Image"}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-2 left-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                {course.category?.toString() || "Unknown"}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {course.title?.toString() || "Untitled Course"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Instructor: {course.instructor?.toString() || "Unknown"}</p>
              <p className="text-sm text-gray-500 mt-1">Duration: {course.duration?.toString() || "N/A"}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-900">${course.price?.toString() || "49.99"}</span>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition">
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

export default CoursePage;
