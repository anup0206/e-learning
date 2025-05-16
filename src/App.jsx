
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import ExploreCourse from "./components/ExploreCourse";
import Categories from "./components/Categories"; // Ensure this exists
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import CreateCourse from "./components/CreateCourse";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explorecourse" element={<ExploreCourse />} />
        <Route path="/createcourse" element={<CreateCourse />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
