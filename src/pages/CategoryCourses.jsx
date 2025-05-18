

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CategoryCourses = () => {
    const { name } = useParams();
    const location = useLocation();
    const courses = location.state?.courses || [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-semibold text-blue-600 mb-4 capitalize">
                Courses in “{name.replace(/-/g, " ")}”
            </h1>

            {courses.length === 0 ? (
                <p className="text-gray-600">No courses found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                {course.title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-3">
                                {course.description?.slice(0, 100)}...
                            </p>
                            <Link
                                to={`/course/${course.title.toLowerCase().replace(/\s/g, "-")}`}
                                className="text-blue-500 hover:underline text-sm font-medium"
                            >
                                View Course →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryCourses;
