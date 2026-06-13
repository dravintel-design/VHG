import React from 'react';
import { Link } from 'react-router-dom';
import vhgLogo from '../assets/vhg-logo-new.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "22px" }}>
              <img src={vhgLogo} alt="Vel Homes Global" style={{ height: '68px', width: 'auto' }} />
            </div>
            <p>Land with clarity. Ownership with confidence. A legacy you can walk.</p>
            <address>
              Villupuram, Tamil Nadu<br />
              India<br /><br />
              <a href="tel:+917867868992" style={{ color: "var(--gold)" }}>786 786 8992</a><br />
              <a href="mailto:hello@velhomesglobal.com" style={{ color: "var(--gold)" }}>hello@velhomesglobal.com</a>
            </address>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><Link to="/about#story">Our Story</Link></li>
              <li><Link to="/about#vision">Vision &amp; Mission</Link></li>
              <li><Link to="/about#founder">Founder's Message</Link></li>
              <li><Link to="/about#faqs">FAQs</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Partner Programs</h4>
            <ul>
              <li><Link to="/partners#land">Land Alliance</Link></li>
              <li><Link to="/partners#channel">Channel Partners</Link></li>
              <li><Link to="/partners#investor">Investor Alliance</Link></li>
              <li><Link to="/partners#global">Global Investor Connect</Link></li>
              <li><Link to="/partners#referral">Referral Circle</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/properties">Our Projects</Link></li>
              <li><Link to="/insights">Blogs &amp; Insights</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Vel Homes Global (VHG) Private Limited. All rights reserved. RERA Reg: TN/02/Building/0000/2011</div>
          <div className="social">
            <a href="#" aria-label="Facebook">
              <svg width="13" height="13" viewBox="0 0 14 14"><path fill="currentColor" d="M8 13v-5h2l.3-2.2H8V4.5c0-.6.2-1 1.1-1H10.4V1.6C10.2 1.5 9.4 1.5 8.5 1.5c-1.8 0-3 1.1-3 3v1.3H3.5V8h2v5z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor"><rect x="1.5" y="1.5" width="11" height="11" rx="3" /><circle cx="7" cy="7" r="2.8" /><circle cx="10.3" cy="3.7" r="0.5" fill="currentColor" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor"><path d="M1.5 4.5h2v8h-2v-8zM2.5 1a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM5.5 4.5h2v1.2c.3-.5 1-1.3 2.3-1.3 2 0 2.5 1.3 2.5 3.1v4.5h-2v-4c0-1-.4-1.6-1.3-1.6-.7 0-1.2.5-1.4 1-.1.2-.1.4-.1.7v3.9h-2v-7.5z" /></svg>
            </a>
            <a href="#" aria-label="X/Twitter">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor"><path d="M10.5 1.5h2L8 7l5 5.5h-4l-3-3.5-3.5 3.5h-2L5.5 7 1 1.5h4l2.5 3zM9.5 11.3h1.1l-5.8-8.8H3.6z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
