// client/src/components/InfoHistory.jsx
import React from "react";
import { motion } from "framer-motion";

export default function InfoHistory() {
  return (
    <section
      id="info"
      className="py-16 bg-gray-50"
      aria-labelledby="info-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2
              id="info-heading"
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              A Festival Of Heritage
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Kadalekai Parishe — the annual groundnut fair of Basavanagudi — traces its
              origins to a centuries-old local legend: farmers offered their first
              groundnut harvest to Nandi (Basavanna) after a mysterious episode involving
              a bull and the discovery of a sacred idol, and the practice grew into the
              large street fair held around the Bull Temple each year. Over time the
              event became both an agricultural offering and a bustling marketplace:
              farmers bring the first yield while traders sell food, toys, bangles and
              traditional crafts, making the fair a lively celebration of harvest,
              community and local commerce. The fair traditionally falls at the end of
              the Karthika month; in recent years organisers have formalised the schedule
              and introduced stronger crowd and environmental management, including
              measures to reduce single-use plastics.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#map"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
              >
                Explore Map
              </a>

              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg shadow-md border border-gray-300 hover:bg-gray-50 hover:shadow-lg transition-all duration-300"
              >
                View Gallery
              </a>
            </div>

            {/* Small source attribution (compact) */}
            <div className="mt-6 text-sm text-gray-500">
              Sources: Karnataka Tourism, Incredible India, local news coverage.
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/history.png"
                alt="Festival crowd and stalls"
                className="w-full h-80 object-cover sm:h-96 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
