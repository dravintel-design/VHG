import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import Tweaks from '../components/Tweaks';
// Sections might contain inner components
import { Achievements, Projects, Value, Founder, Testimonials, HomeInsights, Connect, CtaBand } from '../components/Sections';

// Root app
function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Achievements />
      <Projects />
      <Value />
      <Founder />
      <Testimonials />
      <HomeInsights />
      <Connect />
      <CtaBand />
      <Footer />
      <Tweaks />
    </React.Fragment>
  );
}



export default App;
