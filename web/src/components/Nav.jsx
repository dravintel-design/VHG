import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vhgLogo from '../assets/VHG-Logo-Final.png';

const NAV_ROUTES = {
  About: "/about",
  Properties: "/properties",
  "Partner Programs": "/partners",
  Insights: "/insights",
  Contact: "/contact",
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="logo" onClick={() => setDrawerOpen(false)}>
            <img src={vhgLogo} alt="VHG Logo" style={{ height: '64px', width: 'auto', transition: 'all 0.3s ease', maxHeight: '100%' }} />
          </Link>

          <div className="nav-links">
            {Object.keys(NAV_ROUTES).map((k) => (
              <Link
                key={k}
                className="nav-link"
                to={NAV_ROUTES[k]}
              >
                {k}
              </Link>
            ))}
          </div>

          <div className="nav-cta">
            <Link className="nav-btn" to="/partners">Be a Partner</Link>
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

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${drawerOpen ? "open" : ""}`}>
        {Object.keys(NAV_ROUTES).map((k) => (
          <Link
            key={k}
            className="nav-drawer-link"
            to={NAV_ROUTES[k]}
            onClick={() => setDrawerOpen(false)}
          >
            {k}
          </Link>
        ))}
        <div className="nav-drawer-cta">
          <Link className="nav-btn" to="/partners" onClick={() => setDrawerOpen(false)}>Be a Partner</Link>
          <Link className="nav-btn solid" to="/contact" onClick={() => setDrawerOpen(false)}>Get in Touch</Link>
        </div>
      </div>
    </>
  );
}

export default Nav;
