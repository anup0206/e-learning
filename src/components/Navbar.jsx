import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); // Get current user and logout function from context
    const navigate = useNavigate(); // For programmatic navigation
    const [menuOpen, setMenuOpen] = useState(false); // Toggle mobile menu
    const [searchTerm, setSearchTerm] = useState(""); // Track search input value
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900); // Check for mobile screen

    // Handle responsive menu behavior on window resize
    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 900;
            setIsMobile(newIsMobile);
            if (!newIsMobile) setMenuOpen(false); // Close menu if screen becomes desktop
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Call on mount

        return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
    }, []);

    // Main nav items
    const navItems = [
        { title: "All Courses", path: "/allcourses" },
        { title: "Categories", path: "/categories" },
        { title: "About Us", path: "/aboutus" },
    ];

    // User-specific menu items
    const userItems = [
        {
            title: user?.name || "Guest", // Show name or Guest
            icon: <IoPersonCircleOutline size={20} />,
            path: "/profile",
            className: "text-blue-600 hover:bg-blue-100",
        },
        {
            title: "Logout",
            icon: <AiOutlinePoweroff size={20} />,
            path: "/",
            function: logout, // Run logout function on click
            className: "text-red-600 hover:bg-red-100",
        },
    ];

    // Dummy list of available courses
    const courses = ["React Basics", "Advanced JavaScript", "Web Design", "Python Bootcamp", "Data Structures"];

    // Filter courses based on search input
    const filteredCourses = courses.filter(course =>
        course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <nav className="w-full bg-white shadow-md px-4 py-3 fixed z-50 top-0 left-0">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Brand Logo */}
                <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-blue-600">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full">ED</span>
                    EduLearn
                </div>

                {/* Hamburger menu for mobile */}
                {isMobile && (
                    <div>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-800 text-2xl focus:outline-none"
                        >
                            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                        </button>
                    </div>
                )}

                {/* Desktop navigation menu */}
                {!isMobile && (
                    <div className="flex items-center gap-6">
                        {/* Navigation links */}
                        <ul className="flex gap-6 text-gray-700 font-medium">
                            {navItems.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.path}
                                        className="hover:text-blue-600 transition-colors duration-200"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Search bar */}
                        <div className="relative w-64">
                            <input
                                type="search"
                                placeholder="Search courses..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {/* Filtered search results */}
                            {searchTerm && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
                                    {filteredCourses.length ? (
                                        filteredCourses.map((course, index) => (
                                            <li
                                                key={index}
                                                className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                                                onClick={() => {
                                                    setSearchTerm("");
                                                    navigate(`/course/${course.toLowerCase().replace(/\s/g, '-')}`);
                                                }}
                                            >
                                                {course}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-3 py-2 text-sm text-gray-500">No results found</li>
                                    )}
                                </ul>
                            )}
                        </div>

                        {/* User section */}
                        <div className="flex gap-2">
                            {userItems.map((item, i) => (
                                <Link
                                    key={i}
                                    to={item.path}
                                    onClick={() => {
                                        if (item.function) item.function(); // Run optional function like logout
                                        if (item.title === "Logout") navigate("/login"); // Redirect after logout
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${item.className} text-sm`}
                                >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile dropdown menu */}
            {isMobile && menuOpen && (
                <div className="mt-4 px-2 space-y-3 animate-slide-down">

                    {/* Mobile nav links */}
                    <ul className="flex flex-col gap-2 text-gray-800 font-medium">
                        {navItems.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    to={item.path}
                                    className="block px-3 py-2 rounded hover:bg-blue-50 transition-colors"
                                    onClick={() => setMenuOpen(false)} // Close menu on click
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile search */}
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search courses..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* Filtered search results */}
                        {searchTerm && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
                                {filteredCourses.length ? (
                                    filteredCourses.map((course, index) => (
                                        <li
                                            key={index}
                                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                                            onClick={() => {
                                                setSearchTerm("");
                                                navigate(`/course/${course.toLowerCase().replace(/\s/g, '-')}`);
                                                setMenuOpen(false); // Close menu after navigation
                                            }}
                                        >
                                            {course}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-2 text-sm text-gray-500">No results found</li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Mobile user actions */}
                    <div className="flex flex-col gap-2">
                        {userItems.map((item, i) => (
                            <Link
                                key={i}
                                to={item.path}
                                onClick={() => {
                                    if (item.function) item.function();
                                    if (item.title === "Logout") navigate("/login");
                                    setMenuOpen(false); // Close menu after action
                                }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${item.className} text-sm`}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
