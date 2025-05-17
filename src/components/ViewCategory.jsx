// Category.jsx WHICH FETCH DATA FROM API AND DISPLAY IT TOT WEBSITE

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://blog-1rng.onrender.com/category';

const ViewCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (err) {
                setError('Failed to load categories');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center mt-10">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Categories</h1>
            {categories.length === 0 ? (
                <p className="text-gray-600">No categories found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat._id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-blue-600">{cat.title}</h2>
                            <p className="text-gray-600 mt-2 line-clamp-2">{cat.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewCategory;
