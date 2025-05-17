// pages/EditCourse.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useCourses from "../hooks/useCourses";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCourse } = useCourses();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    faculty: "",
  });

  useEffect(() => {
    // Load course data by ID
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`https://blog-1rng.onrender.com/mycourse/${id}`);
        const data = response.data;
        setFormData({
          title: data.title,
          description: data.description,
          faculty: data.faculty,
        });
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseById();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse.mutate(
      { id, courseData: formData },
      {
        onSuccess: () => navigate("/explorecourse"),
      }
    );
  };

  return (
    <section className="pt-[100px] px-6 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="w-full border p-3 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-3 rounded"
            required
          />
          <input
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            placeholder="Faculty"
            className="w-full border p-3 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Course
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCourse;
