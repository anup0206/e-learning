// pages/ExploreCourse.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCourses from "../hooks/useCourses";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";

const ExploreCourse = () => {
  const {
    data: courses,
    isLoading,
    error,
    deleteCourse,
  } = useCourses();

  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleDelete = (id) => {
    setSelectedCourseId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteCourse.mutate(selectedCourseId);
    setShowModal(false);
    setSelectedCourseId(null);
  };

  return (
    <section className="pt-[100px] px-6 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Explore Courses</h1>
          <Link
            to="/createcourse"
            className="inline-block px-6 py-2 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-xl shadow"
          >
            + Create Course
          </Link>
        </div>

        {isLoading && <p className="text-center">Loading courses...</p>}
        {error && <p className="text-center text-red-600">Error loading courses</p>}

        {!isLoading && courses?.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <motion.li
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border rounded-2xl p-5 shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                <p className="text-xs text-gray-500">
                  <strong>Faculty:</strong> {course.faculty}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Created:</strong> {new Date(course.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/editcourse/${course._id}`}
                    className="group flex items-center gap-1 text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    <FaEdit className="group-hover:rotate-6 transition-transform duration-200" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="group flex items-center gap-1 text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    <FaTrashAlt className="group-hover:rotate-[-6deg] transition-transform duration-200" />
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          !isLoading && <p className="text-center text-gray-600 mt-10">No courses found.</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-transform duration-300 transform hover:rotate-90"
              >
                <FaTimes size={18} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this course? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExploreCourse;
