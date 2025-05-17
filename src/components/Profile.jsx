import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const [myCourse, setMyCourse] = useState([]);
  const [myCategory, setMyCategory] = useState([]);
  const [editCourse, setEditCourse] = useState([]);
  const { user } = useContext(AuthContext);

  // Local state to hold editable name and email
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // Fetch user's course
  const fetchCourse = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(
        `https://blog-1rng.onrender.com/mycourse/${user._id}?t=${Date.now()}`
      );
      setMyCourse(response.data || []);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  // Fetch user's category
  const fetchCategory = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(
        `https://blog-1rng.onrender.com/category/${user._id}?t=${Date.now()}`
      );
      setMyCategory(response.data || []);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchCourse();
      fetchCategory();
    }
  }, [user?._id]);

  // Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete the course?")) return;

    try {
      const response = await axios.delete(`https://blog-1rng.onrender.com/mycourse/${id}`);
      if (response.status === 200) {
        alert("Course deleted successfully");
        fetchCourse(); // Refresh course list after deletion
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg pt-20 p-8 mt-10 mb-10 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">User Profile</h2>

      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar block with optional uploaded image and initials fallback */}
        <div className="relative w-36 h-24 sm:w-36 sm:h-28 rounded-full overflow-hidden shadow-md group">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || "User Avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-4xl font-bold">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left">
          <div className="text-2xl font-semibold text-gray-800">{name}</div>
          <div className="text-gray-600">{email}</div>
          <div className="text-sm text-gray-500 italic">
            Member since:{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </div>
        </div>
      </div>


      {/* Horizontal divider */}
      <hr className="my-8 border-gray-300" />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center shadow">
          <div className="text-gray-700 font-medium mb-2">Total Courses Enrolled</div>
          <div className="text-3xl text-teal-600 font-bold">{myCourse.length}</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center shadow">
          <div className="text-gray-700 font-medium mb-2">Total Categories Enrolled</div>
          <div className="text-3xl text-teal-600 font-bold">{myCategory.length}</div>
        </div>
      </div>

      
    </div>
  );
};

export default Profile;