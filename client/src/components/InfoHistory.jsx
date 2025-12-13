// client/src/components/InfoHistory.jsx
import React from "react";

export default function InfoHistory() {
  return (
    <section
      id="info"
      className="py-16 bg-orange-100 text-gray-900"
      aria-labelledby="info-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <h2
              id="info-heading"
              className="text-4xl font-extrabold text-black mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              A Festival Of Heritage
            </h2>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
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

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="#map"
                className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition"
              >
                Explore Map
              </a>

              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-full shadow border border-gray-200 hover:bg-gray-50 transition"
              >
                View Gallery
              </a>
            </div>

            {/* Small source attribution (compact) */}
            <div className="mt-6 text-xs text-gray-500">
              Sources: Karnataka Tourism, Incredible India, local news coverage.
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="/history.png"
                alt="Festival crowd and stalls"
                className="w-full h-80 object-cover sm:h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
