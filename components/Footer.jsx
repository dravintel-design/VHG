function Footer() {
  return (
    <footer className="footer" data-screen-label="10 Footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{display:"flex", alignItems:"center", gap:14}}>
              <div className="logo-mark" style={{color:"var(--gold)", borderColor:"var(--gold)"}}>V</div>
              <div>
                <div style={{fontFamily:"var(--display)", fontSize:26, color:"var(--white)"}}>Vel Homes</div>
                <div style={{fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.24em", color:"var(--gold)"}}>GLOBAL · EST. 2011</div>
              </div>
            </div>
            <p>Land with clarity. Ownership with confidence. A legacy you can walk.</p>
            <address>
              No. 42, Anna Salai, T. Nagar<br/>
              Chennai, Tamil Nadu 600017<br/>
              India<br/><br/>
              <a href="tel:+919999999999" style={{color:"var(--gold)"}}>+91 99999 99999</a><br/>
              <a href="mailto:hello@velhomesglobal.com" style={{color:"var(--gold)"}}>hello@velhomesglobal.com</a>
            </address>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><a href="about.html#story">Our Story</a></li>
              <li><a href="about.html#vision">Vision & Mission</a></li>
              <li><a href="about.html#founder">Founder's Message</a></li>
              <li><a href="about.html#faqs">FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Partner Programs</h4>
            <ul>
              <li><a href="partners.html#land">Land Alliance</a></li>
              <li><a href="partners.html#channel">Channel Partners</a></li>
              <li><a href="partners.html#investor">Investor Alliance</a></li>
              <li><a href="partners.html#global">Global Investor Connect</a></li>
              <li><a href="partners.html#referral">Referral Circle</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="properties.html">Our Projects</a></li>
              <li><a href="insights.html">Blogs & Insights</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Vel Homes Global (VHG) Private Limited. All rights reserved. CIN: U70100TN2011PTC000000 · RERA Reg: TN/02/Building/0000/2011</div>
          <div className="social">
            <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 14 14"><path fill="currentColor" d="M8 13v-5h2l.3-2.2H8V4.5c0-.6.2-1 1.1-1H10.4V1.6C10.2 1.5 9.4 1.5 8.5 1.5c-1.8 0-3 1.1-3 3v1.3H3.5V8h2v5z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"><rect x="1.5" y="1.5" width="11" height="11" rx="3"/><circle cx="7" cy="7" r="2.8"/><circle cx="10.3" cy="3.7" r="0.5" fill="currentColor"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M1.5 4.5h2v8h-2v-8zM2.5 1a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM5.5 4.5h2v1.2c.3-.5 1-1.3 2.3-1.3 2 0 2.5 1.3 2.5 3.1v4.5h-2v-4c0-1-.4-1.6-1.3-1.6-.7 0-1.2.5-1.4 1-.1.2-.1.4-.1.7v3.9h-2v-7.5z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M10.5 1.5h2L8 7l5 5.5h-4l-3-3.5-3.5 3.5h-2L5.5 7 1 1.5h4l2.5 3zM9.5 11.3h1.1l-5.8-8.8H3.6z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
