import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Tweaks from '../components/Tweaks';
// Sections might contain inner components
import { Achievements, Value, Founder, Testimonials, CtaBand } from '../components/Sections';
import PropertyShowcase from '../components/PropertyShowcase';

// Root app
function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <PropertyShowcase />
      <Achievements />
      <Value />
      <Founder />
      <Testimonials />
      <CtaBand />
      <Footer />
      <Tweaks />
    </React.Fragment>
  );
}



export default App;
