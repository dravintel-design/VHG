import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/About.jsx';
import ContactPage from './pages/Contact.jsx';
import InsightsPage from './pages/Insights.jsx';
import PartnersPage from './pages/Partners.jsx';
import PropertiesPage from './pages/Properties.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
