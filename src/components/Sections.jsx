import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// All major page sections

// Hook for number count-up when in view
function useInView(ref, opts = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.2, ...opts });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return inView;
}

function CountUp({ to, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// Zoom-on-scroll image wrapper
function ZoomFrame({ children, className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress from 0 (just entered bottom) to 1 (about to exit top)
      const p = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
      const clamped = Math.max(0, Math.min(1, p));
      const intensity = (window.__TWEAKS && window.__TWEAKS.zoomIntensity) || 1.15;
      const scale = 1 + (intensity - 1) * clamped;
      el.style.setProperty("--z", scale.toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={ref} className={`zoom-img ${className}`} style={style}>{children}</div>;
}

// Simple reveal-on-scroll wrapper
function Reveal({ children, as = "div", className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// ====================== ACHIEVEMENTS =================
function Achievements() {
  return (
    <section className="achievements" id="achievements" data-screen-label="02 Achievements">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">Our Achievements</div>
            <h2>Fourteen years.<br/><span className="italic-accent">Measurable ground.</span></h2>
          </div>
          <p>Each project is planned to create lasting appreciation combining prime location, quality, and the assurance of VHG transparency.</p>
        </Reveal>

        <div className="ach-grid">
          <div className="ach-cell">
            <div className="ach-num"><CountUp to={14} /><sup>+</sup></div>
            <div className="ach-label">Years</div>
            <p>Development experience in premium plotted and lifestyle projects across Tamil Nadu.</p>
          </div>
          <div className="ach-cell">
            <div className="ach-num"><CountUp to={3200} /><sup>+</sup></div>
            <div className="ach-label">Plots Delivered</div>
            <p>Handed over and under development across South India each RERA-approved and independently verified.</p>
          </div>
          <div className="ach-cell">
            <div className="ach-num"><CountUp to={78} /><sup>L</sup></div>
            <div className="ach-label">Sq. ft. So Far</div>
            <p>Master-planned across 34 completed and 5 upcoming layouts, all title-cleared and survey-verified.</p>
          </div>
        </div>

        <div className="ach-foot">
          <p>"We don't sell plots. We hand over clarity titled, surveyed, zoned, and ready for a life you haven't lived yet."</p>
          <a className="nav-btn solid" href="#contact" style={{ whiteSpace: "nowrap" }}>Contact Us →</a>
        </div>
      </div>
    </section>
  );
}

// ====================== PROJECTS =================
const PROJECTS = [
  { img: "/layouts/mahalakshmi-nagar.png", tag: "Ongoing", name: "Mahalakshmi Nagar", loc: "Perambalur", status: "Selling", size: "95,348 sq.ft", price: "Contact Us", plots: "74 Plots", phLabel: "AERIAL · LAYOUT" },
  { img: "/layouts/GlobalCityArch.jpeg", tag: "New Launch", name: "Global City", loc: "Puthirankottai", status: "Selling", size: "61,028 sq.ft", price: "Contact Us", plots: "47 Plots", phLabel: "RESIDENTIAL · PLOTS" },
  { img: "/layouts/golden-city.png", tag: "New Launch", name: "Golden City", loc: "Kariayamanikam", status: "Selling", size: "73,013 sq.ft", price: "Contact Us", plots: "61 Plots", phLabel: "PREMIUM · PLOTS" },
  { img: "/layouts/jkr-city.png", tag: "Completed", name: "JL Industry", loc: "Navamalkapper", status: "Delivered", size: "24,634 sq.ft", price: "Sold Out", plots: "3 Plots", phLabel: "COMMERCIAL · ZONE" },
  { img: "/layouts/smv-nagar.png", tag: "Completed", name: "Sundaramurthi Vinayagar Nagar", loc: "Perangiyur", status: "Delivered", size: "57,833 sq.ft", price: "Sold Out", plots: "47 Plots", phLabel: "GATED · COMMUNITY" },
  { img: "/layouts/jkr-city.png", tag: "Completed", name: "JKR City", loc: "V Agaram", status: "Delivered", size: "1,38,143 sq.ft", price: "Sold Out", plots: "145 Plots", phLabel: "TOWNSHIP · LAYOUT" },
];

function Projects() {
  return (
    <section className="projects" id="properties" data-screen-label="03 Projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">Our Projects</div>
            <h2>Where land becomes<br/><span className="italic-accent">an address.</span></h2>
          </div>
          <p>Premium developments across Tamil Nadu's most strategic growth corridors. All RERA-approved. All survey-verified.</p>
        </Reveal>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} className="proj-card" delay={i * 60}>
              <div className="proj-media">
                <span className="badge">{p.tag}</span>
                <span className="price">{p.price}</span>
                <ZoomFrame className="layout-img" style={{ backgroundImage: `url(${p.img})`, position: 'absolute', inset: 0 }}>
                  <span className="ph-label" style={{ zIndex: 2, position: 'relative' }}>{p.phLabel}</span>
                </ZoomFrame>
              </div>
              <div className="proj-body">
                <h3>{p.name}</h3>
                <div className="proj-loc">
                  <svg width="10" height="13" viewBox="0 0 10 13" fill="none"><path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 8 5 8s5-4.25 5-8c0-2.76-2.24-5-5-5zm0 6.8a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6z" fill="currentColor"/></svg>
                  {p.loc}
                </div>
                <div className="proj-stats">
                  <div className="proj-stat"><small>Status</small><b>{p.status}</b></div>
                  <div className="proj-stat"><small>Plot Size</small><b>{p.size}</b></div>
                  <div className="proj-stat"><small>Inventory</small><b>{p.plots}</b></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="show-more">
          <a className="btn-link" href="#">Explore All Projects <span>→</span></a>
        </div>
      </div>
    </section>
  );
}

// ====================== VALUE =================
const VALUES = [
  { n: "01", t: "World-class infrastructure", d: "Engineered roads, designer street-lighting, storm drainage, fibre-ready conduits and landscaped avenues." },
  { n: "02", t: "Eco-sensitive development", d: "Rainwater harvesting, solar street-lights, native-tree cover and zero-encroachment green belts." },
  { n: "03", t: "Assured appreciation", d: "Every location is pre-qualified against a 7-factor growth matrix infra, industry, accessibility, zoning." },
  { n: "04", t: "Lifelong customer support", d: "One relationship manager from enquiry to handover and for every registration, re-sale or question after." },
];

function ValueIcon({ i }) {
  const icons = [
    <path d="M3 20h18M5 20V10l7-6 7 6v10M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.3" fill="none"/>,
    <path d="M12 2l3 6 6 1-4.5 4 1.5 6-6-3-6 3 1.5-6L3 9l6-1z" stroke="currentColor" strokeWidth="1.3" fill="none"/>,
    <path d="M3 17l6-6 4 4 8-8M14 7h7v7" stroke="currentColor" strokeWidth="1.3" fill="none"/>,
    <path d="M12 2a8 8 0 108 8M12 2v8l5 3" stroke="currentColor" strokeWidth="1.3" fill="none"/>,
  ];
  return <svg width="24" height="24" viewBox="0 0 24 24">{icons[i]}</svg>;
}

function Value() {
  return (
    <section className="value" id="value" data-screen-label="04 Value">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">How we add value</div>
            <h2>Not just land.<br/><span className="italic-accent">A living ecosystem.</span></h2>
          </div>
          <p>VHG offers not just land but a complete living ecosystem from zoned layouts to amenity-rich communities that enhance comfort, security and long-term growth.</p>
        </Reveal>

        <div className="value-grid">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} className="value-cell" delay={i * 80}>
              <span className="value-num">{v.n} / 04</span>
              <div className="value-icon"><ValueIcon i={i} /></div>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== FOUNDER =================
function Founder() {
  return (
    <section className="founder" id="founder" data-screen-label="05 Founder">
      <div className="wrap">
        <div className="founder-grid">
          <Reveal className="founder-img">
            <ZoomFrame className="layout-img" style={{ backgroundImage: `url(/uploads/JL.png)`, position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center' }}></ZoomFrame>
          </Reveal>
          <Reveal>
            <div className="founder-body">
              <div className="eyebrow">Founder's Message</div>
              <h2>Land should not only<br/>be profitable.<br/><span className="italic-accent">It should be purposeful.</span></h2>
              <blockquote className="founder-quote">
                "When we started Vel Homes Global, our goal was simple yet uncompromising to make land investments accessible to every family, with clarity in property appreciation."
              </blockquote>
              <p>We believed every family should own land with confidence, and every investor should see measurable growth from their decision. Each project we launch is personally overseen to ensure our customers get more than plots they get peace of mind and a foundation for their future.</p>
              <p>Our journey is driven by a belief that real estate should connect communities and create value that lasts generations.</p>
              <div className="founder-sign">
                <div style={{fontFamily:"var(--display)", fontSize:28, fontStyle:"italic", color:"var(--gold)"}}>JL</div>
                <div>
                  <b>Mr. Jambulingam</b>
                  <small>Founder & CEO · Vel Homes Global</small>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ====================== TESTIMONIALS =================
const TESTIMONIAL_VIDEOS = [
  { id: "S_g11B489r0", start: 1 },
  { id: "a9rmN10oItE", start: 25 },
  { id: "4-qtrKs2aPk", start: 0 },
];

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials" data-screen-label="06 Testimonials">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{color:"var(--gold)"}}>Trusted by 500+ families</div>
          <h2>Families, investors & institutions <br/>trusted with their heart<br/><span className="italic-accent">and soul in VHG.</span></h2>
        </Reveal>
        <div className="testimonial-videos">
          {TESTIMONIAL_VIDEOS.map((v, idx) => (
            <Reveal key={v.id} className="testimonial-video" delay={idx * 90}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.id}?start=${v.start}&rel=0&modestbranding=1`}
                title={`VHG testimonial ${idx + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== INSIGHTS =================
const INSIGHTS = [
  { ph: "ph-c", tag: "Market Report", date: "Apr 2026", title: "Why the Oragadam corridor is Tamil Nadu's fastest-appreciating belt", excerpt: "A 14-point infrastructure analysis shows industrial investment driving plot values up 28% YoY." },
  { ph: "ph-d", tag: "Investment Guide", date: "Mar 2026", title: "RERA 2.0: what every plot buyer must verify before signing", excerpt: "The seven documents, three surveys, and one approval letter that separate a clear title from a costly mistake." },
  { ph: "ph-e", tag: "Location Intel", date: "Feb 2026", title: "Hosur's farm-plot renaissance: a decade of agri-leisure growth", excerpt: "Weekend landowners, biodiversity corridors and why Krishnagiri is the new long-weekend capital." },
];

function Insights() {
  return (
    <section className="insights" id="insights" data-screen-label="07 Insights">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">Latest Insights</div>
            <h2>Intelligence from<br/><span className="italic-accent">the ground up.</span></h2>
          </div>
          <p>Market reports, investment guides and location intelligence published monthly by our in-house research team.</p>
        </Reveal>

        <div className="ins-grid">
          {INSIGHTS.map((x, i) => (
            <Reveal key={i} className="ins-card" delay={i * 80}>
              <div className="ins-media">
                <ZoomFrame className={`ph ${x.ph}`}></ZoomFrame>
              </div>
              <div className="ins-meta">
                <span className="tag">{x.tag}</span>
                <span>{x.date}</span>
                <span>5 min read</span>
              </div>
              <h3>{x.title}</h3>
              <p>{x.excerpt}</p>
              <span className="read">Read article →</span>
            </Reveal>
          ))}
        </div>

        <div className="show-more">
          <a className="btn-link" href="#">All insights <span>→</span></a>
        </div>
      </div>
    </section>
  );
}

// ====================== CONNECT =================
const CONNECT = [
  { ph: "ph-a", tag: "For Customers", title: "Find your plot", text: "Discover projects, schedule site visits, and secure your investment with ease." },
  { ph: "ph-b", tag: "For Investors", title: "Partner with VHG", text: "Pre-launch access and institutional-grade reporting on high-growth developments." },
  { ph: "ph-c", tag: "For Landowners", title: "Alliance Program", text: "Convert your land into a premium VHG layout with a fair share of the upside." },
];

function Connect() {
  return (
    <section className="connect" id="contact" data-screen-label="08 Connect">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">Connect with VHG</div>
            <h2>Three doors.<br/><span className="italic-accent">One destination.</span></h2>
          </div>
          <p>Whether you're buying your first plot, scaling a portfolio, or partnering a parcel of land here's where your VHG journey begins.</p>
        </Reveal>

        <div className="connect-grid">
          {CONNECT.map((c, i) => (
            <Reveal key={i} className="connect-card" delay={i * 100}>
              <div className="connect-media">
                <ZoomFrame className={`ph ${c.ph}`}></ZoomFrame>
              </div>
              <div className="connect-body">
                <div className="eyebrow">{c.tag}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <a className="btn-link" href="#">Enquire Now <span>→</span></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ====================== CTA BAND =================
function CtaBand() {
  return (
    <section className="cta-band" data-screen-label="09 CTA">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">Turn Land into Prosperity</div>
          <h2>Every VHG development is built on<br/>clarity, quality &<br/><span className="italic-accent">commitment.</span></h2>
          <p>Whether you build, invest, or partner your journey to prosperity begins here.</p>
          <div className="cta-buttons">
            <Link className="btn primary" to="/contact">Book a Site Visit <span>→</span></Link>
            <a
              className="btn ghost"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('open-projects-menu'));
              }}
            >
              Explore Projects
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { Achievements, Projects, Value, Founder, Testimonials, Insights as HomeInsights, Connect, CtaBand };
