export default function Navbar({ activeSection, setActiveSection }) {
  const handleNavClick = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="w-full bg-black py-4 shadow-lg fixed top-0 left-0 z-50 fade-slide-down">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <h1 
          onClick={() => handleNavClick('home')}
          className="text-2xl font-extrabold text-orange-500 fade-slide-right cursor-pointer hover:text-orange-400 transition"
        >
          Kadlekai Parishe
        </h1>

        {/* MENU LINKS */}
        <ul className="hidden md:flex gap-6 text-white font-medium text-base">
          <li>
            <button 
              onClick={() => handleNavClick('home')}
              className={`hover:text-orange-400 transition fade-slide-up ${activeSection === 'home' ? 'text-orange-400' : ''}`}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('team')}
              className={`hover:text-orange-400 transition fade-slide-up ${activeSection === 'team' ? 'text-orange-400' : ''}`}
            >
              Volunteer Team
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('vendor')}
              className={`hover:text-orange-400 transition fade-slide-up ${activeSection === 'vendor' ? 'text-orange-400' : ''}`}
            >
              Register Vendor
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('volunteer')}
              className={`hover:text-orange-400 transition fade-slide-up ${activeSection === 'volunteer' ? 'text-orange-400' : ''}`}
            >
              Join as Volunteer
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('parking')}
              className={`hover:text-orange-400 transition fade-slide-up ${activeSection === 'parking' ? 'text-orange-400' : ''}`}
            >
              Parking
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('admin')}
              className={`hover:text-orange-400 transition fade-slide-up ${activeSection === 'admin' ? 'text-orange-400' : ''}`}
            >
              🔐 Admin
            </button>
          </li>
        </ul>

      </div>
    </nav>
  );
}
