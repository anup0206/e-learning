import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Assumes AuthContext provides user and logout
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch courses and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          axios.get("https://blog-1rng.onrender.com/mycourse"),
          axios.get("https://blog-1rng.onrender.com/category"),
        ]);

        setCourses(coursesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };
    fetchData();
  }, []);

  // Handle window resize for mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 900;
      setIsMobile(isNowMobile);
      if (!isNowMobile) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter suggestions for courses and categories
  const filteredSuggestions = searchTerm
    ? [
        ...categories.map((cat) => ({
          type: "category",
          title: cat.title,
          id: cat.id,
        })),
        ...courses.map((course) => ({
          type: "course",
          title: course.title,
          id: course.id,
          category: categories.find((cat) =>
            cat.courses?.some((c) => c.id === course.id)
          )?.title,
        })),
      ]
        .filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 6)
    : [];

  // Handle category click/navigation
  const handleCategoryClick = async (catTitle) => {
    try {
      const res = await axios.get(
        `https://blog-1rng.onrender.com/mycourse/category/${catTitle}`
      );
      const categoryCourses = res.data;
      navigate(`/category/${catTitle.toLowerCase().replace(/\s/g, "-")}`, {
        state: { courses: categoryCourses },
      });
      resetSearch();
    } catch (err) {
      console.error("Error fetching category courses:", err);
    }
  };

  // Handle course click/navigation
  const handleCourseClick = (courseTitle) => {
    navigate(`/course/${courseTitle.toLowerCase().replace(/\s/g, "-")}`);
    resetSearch();
  };

  // Reset search state
  const resetSearch = () => {
    setSearchTerm("");
    setShowDropdown(false);
    setMenuOpen(false);
  };

  // Handle search submission
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const lowerTerm = searchTerm.toLowerCase();
    const matchedCategory = categories.find((cat) =>
      cat.title.toLowerCase().includes(lowerTerm)
    );

    if (matchedCategory) {
      handleCategoryClick(matchedCategory.title);
      return;
    }

    const matchedCourse = courses.find((course) =>
      course.title.toLowerCase().includes(lowerTerm)
    );

    if (matchedCourse) {
      handleCourseClick(matchedCourse.title);
      return;
    }

    alert("No matching category or course found.");
  };

  const navItems = [
    { title: "All Courses", path: "/explorecourse" },
    { title: "Categories", path: "/categories" },
    { title: "About Us", path: "/aboutus" },
  ];

  const userItems = user
    ? [
        {
          title: user.name || "Guest",
          icon: <IoPersonCircleOutline size={20} />,
          path: "/profile",
          className: "text-blue-600 hover:bg-blue-100",
        },
        {
          title: "Logout",
          icon: <AiOutlinePoweroff size={20} />,
          path: "/login",
          function: logout,
          className: "text-red-600 hover:bg-red-100",
        },
      ]
    : [
        {
          title: "Login",
          path: "/signin",
          className: "text-blue-600 hover:bg-blue-100",
        },
        {
          title: "Register",
          path: "/signup",
          className: "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500",
        },
      ];

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 fixed z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-blue-600/NotDark">
          <Link to={user ? "/dashboard" : "/"}>
            <span className="bg-blue-600/NotDark text-white px-2 py-1 rounded-full">ED</span>
            EduLearn
          </Link>
        </div>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 text-2xl"
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <ul className="flex gap-6 text-gray-700 font-medium">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="hover:text-blue-600/NotDark">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="relative w-64">
              <input
                type="search"
                placeholder="Search courses or categories..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              {showDropdown && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white mt-1 border rounded shadow max-h-48 overflow-y-auto">
                  {filteredSuggestions.map((item, i) => (
                    <li
                      key={`${item.type}-${i}`}
                      className="px-3 py-2 hover:bg-blue-50 text-sm cursor-pointer"
                      onClick={() =>
                        item.type === "category"
                          ? handleCategoryClick(item.title)
                          : handleCourseClick(item.title)
                      }
                    >
                      {item.type === "category" ? `📁 ${item.title}` : `📚 ${item.title}`}
                    </li>
                  ))}
                  {filteredSuggestions.length === 0 && searchTerm && (
                    <li className="px-3 py-2 text-gray-500 text-sm">
                      No results found
                    </li>
                  )}
                </ul>
              )}
            </div>

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

          <div className="relative">
            <input
              type="search"
              placeholder="Search courses or categories..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            {showDropdown && filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white mt-1 border rounded shadow max-h-64 overflow-y-auto">
                {filteredSuggestions.map((item, i) => (
                  <li
                    key={`${item.type}-${i}`}
                    className="px-3 py-2 hover:bg-blue-50 text-sm cursor-pointer"
                    onClick={() =>
                      item.type === "category"
                        ? handleCategoryClick(item.title)
                        : handleCourseClick(item.title)
                    }
                  >
                    {item.type === "category" ? `📁 ${item.title}` : `📚 ${item.title}`}
                  </li>
                ))}
                {filteredSuggestions.length === 0 && searchTerm && (
                  <li className="px-3 py-2 text-sm text-gray-500">
                    No results found
                  </li>
                )}
              </ul>
            )}
          </div>

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
