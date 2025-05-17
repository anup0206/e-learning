
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import ExploreCourse from "./pages/ExploreCourse";
import ViewCategory from "./components/ViewCategory"; 
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import CourseForm from "./components/CourseForm";
import CoursePage from "./pages/CoursePage";
import Aboutus from "./components/Aboutus"
import EditCourse from "./pages/EditCourse"

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
        <Route path="/createcourse" element={<CourseForm />} />
        <Route path="/coursepage" element={<CoursePage />}/>
        <Route path="/edit/:id" element={<EditCourse/>} />


        <Route path="/categories" element={<ViewCategory />} />
                         
        <Route path="/aboutus" element={<Aboutus />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;