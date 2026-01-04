import React, { useState } from 'react';
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
import VolunteerProfiles from './components/VolunteerProfiles';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
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
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderContent()}
      {activeSection !== 'admin' && activeSection !== 'team' && <Footer />}
    </div>
  );
}

export default App;
