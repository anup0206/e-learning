import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AuthContext } from "../context/AuthContext"; //correct path

const Signin = () => {
    const { signin } = useContext(AuthContext); // 
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    });

    const postData = async (values) => {
        try {
            const response = await axios.post("https://blog-hqx2.onrender.com/user/login", values);
            const { token, user } = response.data;

            signin(token, user); // Call context login
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            console.error("Login error:", error);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        await postData(values);
        resetForm();
    };

    const inputFields = [
        { id: "email", name: "email", type: "email", placeholder: "Email", label: "Email" },
        { id: "password", name: "password", type: "password", placeholder: "Password", label: "Password" },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
            <div className="w-full max-w-lg p-6 sm:p-8 bg-white shadow-md rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <p className="px-3 py-2 text-center bg-blue-500 rounded-full text-white mb-6">ED</p>
                    <h2 className="text-2xl font-semibold mb-6 text-center">Sign in to your account</h2>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <p className="text-gray-500 font-medium">OR</p>
                        <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                            Create your account
                        </Link>
                    </div>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form className="space-y-5 w-full mt-6">
                            {inputFields.map((field) => (
                                <div key={field.id}>
                                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                    </label>
                                    <Field
                                        id={field.id}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                    <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            ))}

                            <div className="flex items-center justify-between text-sm">
                                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Forgot password?
                                </Link>
                                <div className="flex items-center">
                                    <label className="text-gray-600 mr-2">Remember me</label>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                                </div>
                            </div>

                            <ToastContainer />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            >
                                Log in
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>

            <Link
                to="/"
                className="mt-6 flex items-center text-blue-600 font-semibold transition duration-300 group relative"
            >
                <IoIosArrowRoundBack className="text-2xl group-hover:-translate-x-1 transition duration-300" />
                <span className="ml-2 group-hover:text-blue-800">Back to landing page</span>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left"></span>
            </Link>
        </div>
    );
};

export default Signin;
