import { MapPin, Camera } from "lucide-react";

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
      <div className="absolute inset-0 bg-black/40"></div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 max-w-3xl px-10 md:px-20 fade-slide-left">
        <h1 className="text-white shadow-3xl text-5xl md:text-7xl font-extrabold leading-tight fade-slide-up">
          Kadlekai Parishe
        </h1>

        <p className="text-orange-50  shadow-black text-lg md:text-2xl mt-4 max-w-xl fade-slide-up">
          Experience 500 years of tradition at Bangalore's iconic groundnut fair.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex flex-wrap gap-6">
          <a
            href="#map"
            className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 text-lg shadow-lg fade-slide-up"
          >
            Explore Map <MapPin size={22} />
          </a>

          <a
            href="#gallery"
            className="bg-white hover:bg-gray-100 transition text-gray-900 font-semibold px-8 py-4 rounded-full flex items-center gap-3 text-lg shadow-lg fade-slide-up"
          >
            View Gallery <Camera size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
