import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#0E1117] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap gap-16">

        {/* Logo and description */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
            <div className="bg-gray-700 px-2 py-1 rounded-full text-sm">ED</div>
            <span>EduLearn</span>
          </div>
          <p className="text-gray-400 text-sm">
            The leading platform for online education and skill development.
          </p>
        </div>

        {/* Categories */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition">Web Development</Link></li>
            <li><Link to="/" className="hover:text-white transition">Data Science</Link></li>
            <li><Link to="/" className="hover:text-white transition">Design</Link></li>
            <li><Link to="/" className="hover:text-white transition">Business</Link></li>
          </ul>
        </div>

        {/* About */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-4">About</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/" className="hover:text-white transition">Instructors</Link></li>
            <li><Link to="/" className="hover:text-white transition">Careers</Link></li>
            <li><Link to="/" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-white transition">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700"></div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-3">
        <p className="text-center">&copy; {new Date().getFullYear()} EduLearn. All rights reserved.</p>
        <div className="flex gap-4 text-xl">
          
          {[
            { icon: <FaFacebook />, link: "/" },
            { icon: <FaSquareTwitter />, link: "/" },
            { icon: <FaInstagram />, link: "/" },
            { icon: <FaLinkedin />, link: "/" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={item.link} className="hover:text-white transition">
                {item.icon}
              </Link>
            </motion.div>
          ))}

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
