import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
        name: 'faculty',
        label: 'Faculty',
        type: 'text',
        placeholder: 'John Doe',
        component: 'input',
    },
    {
        name: 'image',
        label: 'Course Image URL',
        type: 'text',
        placeholder: 'https://example.com/image.jpg',
        component: 'input',
    },
];

const validationSchema = Yup.object({
    title: Yup.string().min(5, 'At least 5 characters').required('Required'),
    description: Yup.string().min(20, 'At least 20 characters').required('Required'),
    faculty: Yup.string().min(3, 'At least 3 characters').required('Required'),
    category: Yup.string().required('Category is required'),
    image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
});

const initialValues = {
    title: '',
    description: '',
    faculty: '',
    category: '',
    image: '',
};

const CreateCourse = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('https://blog-1rng.onrender.com/category');
            setCategories(res.data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            const payload = {
                title: values.title,
                description: values.description,
                faculty: values.faculty,
                category: values.category,
                image: values.image, // ✅ send exactly as `image`
            };

            await axios.post('https://blog-1rng.onrender.com/mycourse/create', payload);

            setStatus({ success: '✅ Course created successfully!' });
            resetForm();
        } catch (error) {
            console.error('Submission error:', error?.response?.data || error);
            setStatus({ error: '❌ Failed to create course. Try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-24 mb-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Course</h2>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, status }) => (
                    <Form className="space-y-5">
                        {/* Status messages */}
                        {status?.success && <div className="p-3 text-green-700 bg-green-100 rounded">{status.success}</div>}
                        {status?.error && <div className="p-3 text-red-700 bg-red-100 rounded">{status.error}</div>}

                        {/* Input fields */}
                        {fields.map(({ name, label, placeholder, component, type }) => (
                            <div key={name}>
                                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
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
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <Field
                                as="select"
                                name="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.title}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 rounded-lg font-semibold text-white ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                } transition duration-200`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Course'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateCourse;
