import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vhgLogo from '../assets/vhg-logo-new.svg';
import ProjectsMenu from './ProjectsMenu';

const NAV_ROUTES = {
  Home: "/",
  About: "/about",
  Projects: "/properties",
  Contact: "/contact",
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, []);

  // Allow other components (e.g. the CTA band) to open the projects menu
  useEffect(() => {
    const openMenu = () => setProjectsOpen(true);
    window.addEventListener('open-projects-menu', openMenu);
    return () => window.removeEventListener('open-projects-menu', openMenu);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="logo" onClick={() => setDrawerOpen(false)}>
            <img src={vhgLogo} alt="Vel Homes Global" style={{ height: '52px', width: 'auto', transition: 'all 0.3s ease', maxHeight: '100%' }} />
          </Link>

          <div className="nav-links">
            {Object.keys(NAV_ROUTES).map((k) => (
              k === 'Projects' ? (
                <a
                  key={k}
                  className="nav-link"
                  href="/properties"
                  onClick={(e) => {
                    e.preventDefault();
                    setProjectsOpen(true);
                  }}
                >
                  {k}
                </a>
              ) : (
                <Link
                  key={k}
                  className="nav-link"
                  to={NAV_ROUTES[k]}
                  onClick={() => {
                    setProjectsOpen(false);
                    if (k === 'Home' && window.location.pathname === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {k}
                </Link>
              )
            ))}
          </div>

          <div className="nav-cta">
            <Link className="nav-btn solid" to="/contact">Get in Touch</Link>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: drawerOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span style={{ opacity: drawerOpen ? 0 : 1 }} />
            <span style={{ transform: drawerOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </nav>

      <ProjectsMenu open={projectsOpen} onClose={() => setProjectsOpen(false)} />

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${drawerOpen ? "open" : ""}`}>
        {Object.keys(NAV_ROUTES).map((k) => (
          k === 'Projects' ? (
            <a
              key={k}
              className="nav-drawer-link"
              href="/properties"
              onClick={(e) => {
                e.preventDefault();
                setDrawerOpen(false);
                setProjectsOpen(true);
              }}
            >
              {k}
            </a>
          ) : (
          <Link
            key={k}
            className="nav-drawer-link"
            to={NAV_ROUTES[k]}
            onClick={() => {
              setDrawerOpen(false);
              if (k === 'Home' && window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            {k}
          </Link>
          )
        ))}
        <div className="nav-drawer-cta">
          <Link className="nav-btn solid" to="/contact" onClick={() => setDrawerOpen(false)}>Get in Touch</Link>
        </div>
      </div>
    </>
  );
}

export default Nav;
