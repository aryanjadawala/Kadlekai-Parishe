// client/src/components/DetailsSection.jsx
import React from "react";
import { motion } from "framer-motion";

export default function DetailsSection() {
  return (
    <section id="details" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Visitor Information
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Everything you need to know before visiting Kadlekai Parishe
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARD TEMPLATE */}
          {[
            {
              icon: "fa-clock",
              title: "Timings",
              text: ["Fair: 6:00 AM – 10:00 PM", "Bull Temple: 6:00 AM – 8:00 PM"],
            },
            {
              icon: "fa-location-dot",
              title: "Location",
              text: [
                "Bull Temple Road, Basavanagudi",
                "Bengaluru, Karnataka 560004",
              ],
            },
            {
              icon: "fa-phone",
              title: "Contact",
              text: ["Phone: +91 80 2657 8822", "Emergency: 108"],
            },
            {
              icon: "fa-car",
              title: "Parking",
              text: ["Two-wheelers: ₹10", "Four-wheelers: ₹20", "Limited spaces available"],
            },
            {
              icon: "fa-train-subway",
              title: "Public Transport",
              text: ["Metro: Lalbagh Station (2km)", "Buses: 34E, 37A, 66, 201"],
            },
            {
              icon: "fa-lightbulb",
              title: "Important Tips",
              text: [
                "Carry cash — many vendors don't accept cards.",
                "Wear comfortable shoes.",
                "Best time: early morning or evening.",
              ],
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300"
            >
              <div className="text-orange-600 text-3xl mb-4">
                <i className={`fa-solid ${card.icon}`}></i>
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">{card.title}</h3>

              {card.text.map((line, i) => (
                <p key={i} className="text-gray-600 text-sm">{line}</p>
              ))}
            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white p-10 rounded-2xl shadow-2xl text-center"
        >
          <h3 className="text-3xl font-bold mb-3">Come Join The Celebration!</h3>
          <p className="text-gray-100 text-lg mb-6">
            The fair is held annually in November. Check our updates for exact dates.
          </p>

          <a
            href="https://www.google.com/maps/d/view?mid=1GSw_Q0Zf0fm0G0F58-EgPhY9sIcGrU4" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300"
          >
            View/Download Map
          </a>
        </motion.div>

      </div>
    </section>
  );
}
