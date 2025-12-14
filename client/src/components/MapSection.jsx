import React from "react";

const MapSection = () => {
  return (
    <section
      id="map"
      className="relative bg-white py-20 px-4 md:px-8"
    >
      {/* Section title */}
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-black mb-4">
        Navigate the Festival
      </h2>

      {/* Fullscreen hint */}
      <p className="text-center text-gray-600 mb-10">
        For the best experience, view the map in{" "}
        <span className="font-semibold text-orange-500">
          full screen
        </span>
        .
      </p>

      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl">
        
        {/* GOOGLE MY MAPS */}
        <iframe
          title="Kadlekai Parishe Map"
          src="https://www.google.com/maps/d/embed?mid=1GSw_Q0Zf0fm0G0F58-EgPhY9sIcGrU4"
          className="w-full h-[75vh] border-0"
          loading="lazy"
        ></iframe>

        {/* MOBILE HINT */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full">
          Pinch & zoom the map to explore
        </div>
      </div>
    </section>
  );
};

export default MapSection;
