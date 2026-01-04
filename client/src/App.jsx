import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import Gallery from './components/Gallery';
import InfoHistory from './components/InfoHistory';
import Details from './components/Details';
import Footer from './components/Footer';
import VendorForm from './components/VendorForm';
import VolunteerForm from './components/VolunteerForm';
import ParkingStatus from './components/ParkingStatus';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import VolunteerProfiles from './components/VolunteerProfiles';
import VendorsPage from './components/VendorsPage';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Listen for navigation events
    const handleNavigate = (event) => {
      setActiveSection(event.detail);
    };

    window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'vendors':
        return <VendorsPage />;
      case 'vendor':
        return (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <VendorForm />
            </div>
          </section>
        );
      case 'volunteer':
        return (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <VolunteerForm />
            </div>
          </section>
        );
      case 'parking':
        return <ParkingStatus />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin':
        return <AdminDashboard />;
      case 'team':
        return <VolunteerProfiles />;
      default:
        return (
          <>
            <Hero />
            <MapSection />
            <Gallery />
            <InfoHistory />
            <Details />
          </>
        );
    }
  };

  return (
    <div className="App">
      {activeSection !== 'admin-login' && <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />}
      {renderContent()}
      {activeSection !== 'admin' && activeSection !== 'admin-login' && activeSection !== 'team' && activeSection !== 'vendors' && <Footer />}
    </div>
  );
}

export default App;
