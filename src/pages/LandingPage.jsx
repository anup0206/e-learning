import React from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Users } from "lucide-react";
import photo1 from "../assets/landingwall.png";
import { Link } from "react-router-dom";

// Animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function LandingPage() {
  return (
    <main className="font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">EduFlow</h1>
          <nav className="space-x-6 text-gray-700 text-sm md:text-base">
            <Link to="/">Home</Link>
            <Link to="/signin" className="hover:text-blue-600">
              Sign In
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 min-h-screen flex items-center justify-between flex-col-reverse md:flex-row gap-16  pb-12">
          <motion.div
            className="flex-1"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              Empower Your Learning Journey
            </h1>
            <p className="text-lg text-gray-600 mt-6 max-w-xl">
              Discover thousands of courses taught by industry experts. Master new skills with interactive, flexible learning — anytime, anywhere.
            </p>
            <p className="text-md text-gray-500 mt-4 max-w-xl">
              Whether you're advancing your career or exploring a new field, EduFlow makes education accessible, engaging, and effective.
            </p>
            <div className="mt-12 flex flex-wrap gap-12">
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-md transition hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                className="px-6 py-3 rounded-xl text-lg border-gray-300 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <PlayCircle size={20} />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center items-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={photo1}
              alt="Learning Visual"
              className="w-full max-w-md max-h-[700px] rounded-2xl shadow-xl object-contain"
            />
          </motion.div>
        </div>
      </section>


      {/* Why Choose Us */}
      <motion.section
        className="py-24 bg-white text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mb-12">
          <h2 className="text-3xl mb-8 md:text-4xl font-bold text-gray-800 relative inline-block">
            Why Choose Us
            <span className="block h-1 w-24 bg-blue-600 mx-auto mt-3 rounded"></span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto font-semibold">
            Discover what makes EduFlow the right platform for your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
          {[
            {
              icon: <BookOpen className="text-blue-600 mx-auto mb-4" size={40} />,
              title: "Expert Instructors",
              desc: "Learn from industry professionals with years of experience.",
            },
            {
              icon: <Users className="text-blue-600 mx-auto mb-4" size={40} />,
              title: "Interactive Community",
              desc: "Connect with peers, mentors, and instructors in real time.",
            },
            {
              icon: <PlayCircle className="text-blue-600 mx-auto mb-4" size={40} />,
              title: "Flexible Learning",
              desc: "Study at your own pace with our self-paced courses.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} EduFlow. All rights reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/privacy" className="hover:text-blue-600">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blue-600">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
