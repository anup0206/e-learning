
import React from "react"
import { Link } from "react-router-dom";


const Footer = () => {

return(
    <section className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
           
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
         <hr className="h-2"/>
          <p>© {new Date().getFullYear()} EduLearn. All rights reserved.</p>
      </section>
)

    
}

export default Footer;