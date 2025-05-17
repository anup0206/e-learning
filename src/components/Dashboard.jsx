// Dashboard.jsx
import React from "react";
import image from "../assets/image.jpg";
import { Link } from "react-router-dom";
import CoursePage from "../pages/CoursePage";
import { motion } from "framer-motion";

const Dashboard = () => {
  const stats = [
    { label: "Courses", value: "120+" },
    { label: "Students", value: "25,000+" },
    { label: "Instructors", value: "120+" },
    { label: "Categories", value: "25+" },
  ];

  return (
    <>
      {/* Main Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 pt-20 md:px-16 pt-24 pb-16 bg-gradient-to-br from-purple-50 to-white">
        {/* Text Content */}
        <motion.div
          className="flex-1 space-y-6 mt-10 md:mt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">
            Unlock Your Potential with <br />
            <span className="text-purple-600">Expert-Led</span> Courses
          </h1>

          <p className="text-gray-700 text-base md:text-lg">
            Discover thousands of courses across various domains taught by industry experts and advance your career with in-demand skills.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/explorecourse">
              <button className="bg-purple-600 text-white px-6 py-2.5 rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md">
                Explore Courses
              </button>
            </Link>
            <Link to="/categories">
              <button className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl hover:bg-gray-300 transition-all duration-300 shadow">
                View Categories
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={image}
            alt="Learning dashboard visual"
            className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* Featured Courses */}
      <CoursePage />
    </>
  );
};

export default Dashboard;
