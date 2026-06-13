import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/About.jsx';
import ContactPage from './pages/Contact.jsx';
import InsightsPage from './pages/Insights.jsx';
import PartnersPage from './pages/Partners.jsx';
import PropertiesPage from './pages/Properties.jsx';
import ProjectPage from './pages/Project.jsx';

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
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
