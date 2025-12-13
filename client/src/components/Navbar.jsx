export default function Navbar() {
  return (
    <nav className="w-full bg-black py-4 shadow-lg fixed top-0 left-0 z-50 fade-slide-down">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-2xl font-extrabold text-orange-500 fade-slide-right">
          Kadlekai Parishe
        </h1>

        {/* MENU LINKS */}
        <ul className="hidden md:flex gap-10 text-white font-medium text-lg">
          <li><a href="#home" className="hover:text-orange-400 transition fade-slide-up">Home</a></li>
          <li><a href="#map" className="hover:text-orange-400 transition fade-slide-up">Map</a></li>
          <li><a href="#gallery" className="hover:text-orange-400 transition fade-slide-up">Gallery</a></li>
          <li><a href="#info" className="hover:text-orange-400 transition fade-slide-up">Info & History</a></li>
          <li><a href="#details" className="hover:text-orange-400 transition fade-slide-up">Details</a></li>
        </ul>

      </div>
    </nav>
  );
}
