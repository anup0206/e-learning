

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

       const { user, logout } = useContext(AuthContext);
    const navitems = [
        {
            title: "All Courses",
            path: "/allcourses",
        },
        {
            title: "Categories",
            path: "/categories",
        },
        {
            title: "About us",
            path: "/aboutus",
        },
    ]

    const userItems = [
        {
            title: user?.name || "Guest",
            icon: <IoPersonCircleOutline size={22} />,
            path: "/profile",
            className: "text-blue-500 hover:bg-blue-50 hover:border-blue-600",
        },
        {
            title: "Logout",
            icon: <AiOutlinePoweroff />,
            path: "/",
            function: logout,
            className: "text-red-500 hover:bg-red-50 hover:border-red-600",
        },
    ];

    return (

        <section className="flex justify-between items-center p-4">
            {/* left section */}
            <div className="flex gap-2">
                <div className="flex gap-2">
                    <h1>
                        <span className="px-2 py-3 bg-blue-500 rounded-full">ED</span>EduLearn
                    </h1>

                </div>
                <div>
                    <ul className="flex gap-2">
                        {navitems.map((val, index) => (
                            <li key={index}>
                                <Link to={val.path}>{val.title}</Link>
                            </li>
                        ))}

                    </ul>
                </div>

            </div>

            {/* right section */}
            <div className="flex gap-2">
                {userItems.map((item, i) => (
                    <Link
                        key={i}
                        to={item.path} onClick={() => {
                            if (item.function) item.function(); // logout()
                            navigate("/login"); // or "/" if that’s your login page

                        }}

                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-transparent transition-all ${item.className}`}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                ))}

            </div>
        </section>
    )


}

export default Navbar;