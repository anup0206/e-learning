import React from "react";
import image from "../assets/image.jpg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between p-10 mt-8 h-screen">
      {/* Left */}
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl font-bold">
          Unlock Your Potential with <span className="text-purple-600">Expert-Led</span> Courses
        </h1>
        <p className="text-gray-700">
          Discover thousands of courses across various domains taught by industry experts and advance your career with in-demand skills.
        </p>

        <div className="flex gap-4">
          <Link to="/explore">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Explore Courses
            </button>
          </Link>
          <Link to="/categories">
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
              View Categories
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center mt-8">
          <div><p className="text-xl font-bold">120+</p><span>Courses</span></div>
          <div><p className="text-xl font-bold">25,000+</p><span>Students</span></div>
          <div><p className="text-xl font-bold">120+</p><span>Instructors</span></div>
          <div><p className="text-xl font-bold">25+</p><span>Categories</span></div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 p-4">
        <img src={image} alt="dashboard" className="rounded-xl shadow-lg" />
      </div>
    </section>
  );
};

export default Dashboard;
