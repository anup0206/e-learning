import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Aboutus = () => {
  const values = [
    {
      title: "Innovation",
      description:
        "We embrace cutting-edge technology to craft interactive, immersive learning journeys for all.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      title: "Community",
      description:
        "We cultivate a vibrant space where learners and educators grow, share, and uplift one another.",
      iconPath:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v2h5m-2-2a3 3 0 005.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zM6 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      title: "Accessibility",
      description:
        "We break barriers—making education inclusive, affordable, and reachable from anywhere.",
      iconPath:
        "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
  ];

  return (
    <section className="bg-gradient-to-tr from-indigo-100 via-white to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 relative inline-block">
            About Our E-Learning Platform
            <span className="block h-1 w-32 mx-auto bg-gradient-to-r from-indigo-500 to-blue-500 mt-3 rounded-full animate-pulse" />
          </h2>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Empowering global learners with boundless access to education—anywhere, anytime.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="mt-20 grid lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={1}
        >
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            <p className="mt-5 text-gray-600 leading-relaxed">
              We aim to democratize knowledge—offering a sanctuary where ambition meets opportunity.
              Learn at your pace, in your space, and unlock your true potential with us.
            </p>
          </div>
          <motion.img
            className="w-full h-72 object-cover rounded-xl shadow-lg"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Students learning"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          className="mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={2}
        >
          <h3 className="text-3xl font-semibold text-gray-800 text-center">Our Core Values</h3>
          <span className="block h-1 w-32 mx-auto bg-gradient-to-r from-indigo-500 to-blue-500 mt-3 rounded-full animate-pulse" />

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/70 border border-gray-200/70 text-center px-6 py-8 rounded-xl shadow-lg hover:shadow-2xl transition"
                variants={fadeInUp}
                custom={index + 3}
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-600 text-white mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={value.iconPath}
                    />
                  </svg>
                </div>
                <h4 className="mt-4 text-xl font-semibold text-gray-800">{value.title}</h4>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={6}
        >
          <a
            href="#"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Join Our Learning Community
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Aboutus;
