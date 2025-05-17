import React from "react";
import image from "../assets/image.jpg"; // Importing dashboard image
import { Link } from "react-router-dom"; // For routing navigation
import FeatureCourse from "./FeatureCourses"; // Importing Featured Courses section

const Dashboard = () => {
  // Statistics to show as feature highlights
  const stats = [
    { label: "Courses", value: "120+" },
    { label: "Students", value: "25,000+" },
    { label: "Instructors", value: "120+" },
    { label: "Categories", value: "25+" },
  ];

  return (
    <>
      {/* Main Dashboard Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 p-6 md:p-10 mt-8">

        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-6">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Unlock Your Potential with{" "}
           <span className="text-purple-600">Expert-Led</span> Courses
          </h1>

          {/* Description Paragraph */}
          <p className="text-gray-700 text-base md:text-lg">
            Discover thousands of courses across various domains taught by industry experts and advance your career with in-demand skills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link to="/explorecourse">
              <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition-all duration-200">
                Explore Courses
              </button>
            </Link>
            <Link to="/categories">
              <button className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 transition-all duration-200">
                View Categories
              </button>
            </Link>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mt-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-2xl font-bold">{stat.value}</p>
                <span className="text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1">
          <img
            src={image}
            alt="Learning dashboard visual"
            loading="lazy"
            className="w-full rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Featured Courses Section */}
      <FeatureCourse />
    </>
  );
};

export default Dashboard;
