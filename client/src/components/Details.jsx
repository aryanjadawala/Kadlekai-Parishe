// client/src/components/DetailsSection.jsx
import React, { useEffect } from "react";
import "./detailsAnimations.css"; // <-- custom CSS animations

export default function DetailsSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-slide-up");
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="details" className="bg-orange-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Title */}
        <div className="text-center animate-on-scroll opacity-0">
          <h2 className="text-4xl font-extrabold text-black mb-2">
            Visitor Information
          </h2>
          <p className="text-gray-700 mb-10">
            Everything you need to know before visiting Kadlekai Parishe
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

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
            <div
              key={index}
              className="
                bg-white p-6 rounded-xl shadow-lg 
                transition transform hover:-translate-y-1 hover:shadow-xl 
                animate-on-scroll opacity-0
              "
            >
              <div className="text-orange-500 text-3xl mb-4">
                <i className={`fa-solid ${card.icon}`}></i>
              </div>

              <h3 className="font-bold text-lg mb-1">{card.title}</h3>

              {card.text.map((line, i) => (
                <p key={i} className="text-gray-700">{line}</p>
              ))}
            </div>
          ))}

        </div>

        {/* CTA */}
        <div
          className="
            mt-16 bg-gradient-to-r from-orange-500 to-orange-600
            text-white p-10 rounded-2xl shadow-xl text-center
            animate-on-scroll opacity-0
          "
        >
          <h3 className="text-3xl font-bold mb-2">COME JOIN THE CELEBRATION!!</h3>
          <p className="text-white/90 mb-6">
            The fair is held annually in November. Check our updates for exact dates.
          </p>

          <a
            href="https://www.google.com/maps/d/view?mid=1GSw_Q0Zf0fm0G0F58-EgPhY9sIcGrU4" target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow 
              hover:bg-gray-100 transition 
            "
          >
            View/Download Map
          </a>
        </div>

      </div>
    </section>
  );
}
