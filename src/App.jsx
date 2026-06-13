import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/About.jsx';
import ContactPage from './pages/Contact.jsx';
import InsightsPage from './pages/Insights.jsx';
import PartnersPage from './pages/Partners.jsx';
import PropertiesPage from './pages/Properties.jsx';
import ProjectPage from './pages/Project.jsx';

// Scroll to the top of the page on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
