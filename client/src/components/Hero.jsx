import { MapPin, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] bg-cover bg-center flex items-center pt-24"
      style={{
        backgroundImage: "url('/hero.png')",
        filter: "brightness(1.25)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* LEFT CONTENT */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl px-10 md:px-20"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-5xl md:text-7xl font-bold leading-tight"
        >
          Kadlekai Parishe
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-100 text-lg md:text-2xl mt-4 max-w-xl"
        >
          Experience 500 years of tradition at Bangalore's iconic groundnut fair.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#map"
            className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <MapPin size={20} />
            Explore Map
          </a>

          <a
            href="#gallery"
            className="bg-white hover:bg-gray-50 transition-all duration-300 text-gray-900 font-semibold px-8 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Camera size={20} />
            View Gallery
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
