import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [courses, setCourses] = useState([]);

  // Fetch courses from API on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://blog-1rng.onrender.com/mycourse");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("API error:", error);
      }
    };
    fetchCourses();
  }, []);

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 900;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter courses by search term
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { title: "All Courses", path: "/explorecourse" },
    { title: "Categories", path: "/categories" },
    { title: "About Us", path: "/aboutus" },
  ];

  const userItems = [
    {
      title: user?.name || "Guest",
      icon: <IoPersonCircleOutline size={20} />,
      path: "/profile",
      className: "text-blue-600 hover:bg-blue-100",
    },
    {
      title: "Logout",
      icon: <AiOutlinePoweroff size={20} />,
      path: "/",
      function: logout,
      className: "text-red-600 hover:bg-red-100",
    },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 fixed z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-blue-600">
          <Link to={'/dashboard'}>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full">ED</span>
          EduLearn
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 text-2xl"
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        ) : (
          <div className="flex items-center gap-6">
            {/* Navigation links */}
            <ul className="flex gap-6 text-gray-700 font-medium">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="hover:text-blue-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Search Bar */}
            <div className="relative w-64">
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* Dropdown results */}
              {searchTerm && (
                <ul className="absolute z-10 w-full bg-white mt-1 border rounded shadow max-h-48 overflow-y-auto">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course, i) => (
                      <li
                        key={i}
                        className="px-3 py-2 hover:bg-blue-50 text-sm cursor-pointer"
                        onClick={() => {
                          setSearchTerm("");
                          navigate(`/course/${course.title.toLowerCase().replace(/\s/g, '-')}`);
                        }}
                      >
                        {course.title}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500 text-sm">No results found</li>
                  )}
                </ul>
              )}
            </div>

            {/* User Profile Options */}
            <div className="flex gap-2">
              {userItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => {
                    if (item.function) item.function();
                    if (item.title === "Logout") navigate("/login");
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${item.className}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div className="mt-4 px-2 space-y-3 animate-slide-down">
          <ul className="flex flex-col gap-2 text-gray-800 font-medium">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  className="block px-3 py-2 rounded hover:bg-blue-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Search */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-48 overflow-y-auto">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 hover:bg-blue-50 text-sm cursor-pointer"
                      onClick={() => {
                        setSearchTerm("");
                        navigate(`/course/${course.title.toLowerCase().replace(/\s/g, '-')}`);
                        setMenuOpen(false);
                      }}
                    >
                      {course.title}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Mobile User Options */}
          <div className="flex flex-col gap-2">
            {userItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={() => {
                  if (item.function) item.function();
                  if (item.title === "Logout") navigate("/login");
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 ${item.className}`}
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
