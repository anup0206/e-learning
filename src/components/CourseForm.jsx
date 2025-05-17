
// USED TO CREATE THE COURSES AND ADD TO API TO DISPLAY IN WEBSITE

import React, { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Define form fields used in the main input section
const fields = [
    {
        name: 'title',
        label: 'Course Title',
        type: 'text',
        placeholder: 'Full Stack Web Development',
        component: 'input',
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Describe what the course covers...',
        component: 'textarea',
    },
    {
        name: 'instructor',
        label: 'Instructor',
        type: 'text',
        placeholder: 'Jane Smith',
        component: 'input',
    },
    {
        name: 'duration',
        label: 'Course Duration',
        type: 'text',
        placeholder: '8 weeks',
        component: 'input',
    },
];

// Form validation schema using Yup
const validationSchema = Yup.object({
    title: Yup.string().min(5, 'At least 5 characters').required('Required'),
    description: Yup.string().min(2, 'At least 2 characters').required('Required'),
    category: Yup.string().required('Category is required'),
    instructor: Yup.string().min(2, 'At least 2 characters').required('Instructor is required'),
    duration: Yup.string().min(1, 'Please enter the course duration').required('Required'),

    // Validates if an image is selected and it's either a File or URL string
    image: Yup.mixed()
        .test('fileType', 'Please upload an image file', value => {
            if (!value) return false;
            if (typeof value === 'string') return true;
            return value instanceof File;
        })
        .required('Image is required'),

    // Optional fields: list of strings
    prerequisites: Yup.array().of(Yup.string()).optional(),
    learningObjective: Yup.array().of(Yup.string()).optional(),
});

// Initial form values for Formik
const initialValues = {
    title: '',
    description: '',
    instructor: '',
    duration: '',
    category: '',
    image: '',
    prerequisites: [''],
    learningObjective: [''],
};

const CourseForm = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]); // Store course categories

    // Fetch categories from API when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://blog-1rng.onrender.com/category');
                setCategories(res.data);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            // Use FormData to support file upload
            const formData = new FormData();
            for (let key in values) {
                if (Array.isArray(values[key])) {
                    values[key].forEach(item => formData.append(`${key}[]`, item));
                } else {
                    formData.append(key, values[key]);
                }
            }

            // POST request to course creation endpoint
            await axios.post('https://blog-1rng.onrender.com/mycourse/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setStatus({ success: '✅ Course created successfully!' });
            resetForm(); // Clear form after success
            navigate('/dashboard')

        } catch (error) {
            console.error('Submission error:', error?.response?.data || error);
            setStatus({ error: '❌ Failed to create course. Try again.' });
        } finally {
            setSubmitting(false); // Re-enable submit button
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-24 mb-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Course</h2>

            {/* Formik wrapper */}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, status, setFieldValue }) => (
                    <Form className="space-y-5">
                        {/* Display success or error messages */}
                        {status?.success && <div className="p-3 text-green-700 bg-green-100 rounded">{status.success}</div>}
                        {status?.error && <div className="p-3 text-red-700 bg-red-100 rounded">{status.error}</div>}

                        {/* Render main input fields */}
                        {fields.map(({ name, label, placeholder, component, type }) => (
                            <div key={name}>
                                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                <Field
                                    as={component}
                                    name={name}
                                    type={type}
                                    placeholder={placeholder}
                                    rows={component === 'textarea' ? 4 : undefined}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                        ))}

                        {/* Category dropdown */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <Field
                                as="select"
                                name="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.title}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        {/* Course image file upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Course Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={e => setFieldValue('image', e.currentTarget.files[0])}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <ErrorMessage name="image" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        {/* Dynamic Prerequisites FieldArray */}
                        <FieldArray name="prerequisites">
                            {({ push, remove, form }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
                                    {form.values.prerequisites.map((_, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <Field name={`prerequisites[${index}]`} className="w-full px-4 py-2 border rounded" />
                                            <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push('')} className="text-blue-600">+ Add Prerequisite</button>
                                </div>
                            )}
                        </FieldArray>

                        {/* Dynamic Learning Objectives FieldArray */}
                        <FieldArray name="learningObjective">
                            {({ push, remove, form }) => (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objectives</label>
                                    {form.values.learningObjective.map((_, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <Field name={`learningObjective[${index}]`} className="w-full px-4 py-2 border rounded" />
                                            <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push('')} className="text-blue-600">+ Add Learning Objective</button>
                                </div>
                            )}
                        </FieldArray>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 rounded-lg font-semibold text-white ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Course'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CourseForm;
