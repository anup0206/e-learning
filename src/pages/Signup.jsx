import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowRoundBack } from "react-icons/io";

const Signup = () => {
    const initialValues = {
        name: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Full Name is required")
            .min(4, "Full Name must be at least 4 characters")
            .max(40, "Full Name cannot exceed 40 characters")
            .matches(/^[a-zA-Z\s]+$/, "Only alphabets and spaces allowed"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),

    });

    const postFormData = async (values) => {
        try {
            await axios.post("https://blog-hqx2.onrender.com/user/register", {
                name: values.name,
                email: values.email,
                password: values.password,
            });
            toast.success("User Registered Successfully!");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "User registration failed";
            toast.error(errorMessage);
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-6">
                <div className="flex flex-col items-center justify-center">
                    <p
                        className="px-3 py-2 text-center bg-blue-500 rounded-full">ED</p>
                    <h2 className="text-2xl font-semibold mb-6 text-center">Create your account Here!</h2>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <p className="text-gray-500 font-medium">OR</p>
                        <p className="text-center ">
                            
                            <Link
                                to="/signin"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Signin to youraccount
                            </Link>
                        </p>
                    </div>
                </div>


                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        postFormData(values);
                    }}
                >
                    <Form className="space-y-5 w-full mt-6">
                        {[
                            {
                                name: "name",
                                label: "Full Name",
                                type: "text",
                                placeholder: "Enter your full name",
                            },
                            {
                                name: "email",
                                label: "Email",
                                type: "email",
                                placeholder: "Enter your email",
                            },
                            {
                                name: "password",
                                label: "Password",
                                type: "password",
                                placeholder: "Enter your password",
                            },
                            {
                                name: "confirm password",
                                label: "confirm password",
                                type: "confirm password",
                                placeholder: "Enter your confirm password",
                            },
                        ].map((field) => (
                            <div key={field.name} className="mb-4">
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {field.label}
                                </label>
                                <Field
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    aria-describedby={`${field.name}-error`}
                                />
                                <ErrorMessage
                                    name={field.name}
                                    component="div"
                                    id={`${field.name}-error`}
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            Create account
                        </button>




                    </Form>
                </Formik>


            </div>

            <Link
                to="/"
                className="mt-6 flex items-center text-blue-600 font-semibold transition duration-300 group relative"
            >
                <IoIosArrowRoundBack className="text-2xl group-hover:-translate-x-1 transition duration-300" />
                <span className="ml-2 group-hover:text-blue-800">
                    Back to landing page
                </span>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left"></span>
            </Link>
        </div>
    );
};

export default Signup;