import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import Gallery from './components/Gallery';
import InfoHistory from './components/InfoHistory';
import Details from './components/Details';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <MapSection />
      <Gallery />
      <InfoHistory />
      <Details />
      <Footer />
    </div>
  );
}

export default App;
