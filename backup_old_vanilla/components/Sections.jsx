// All major page sections
const { useEffect: useEffect$S, useRef: useRef$S, useState: useState$S } = React;

// Hook for number count-up when in view
function useInView(ref, opts = {}) {
  const [inView, setInView] = useState$S(false);
  useEffect$S(() => {
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
  const ref = useRef$S(null);
  const inView = useInView(ref);
  const [val, setVal] = useState$S(0);
  useEffect$S(() => {
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
function ZoomFrame({ children, className = "" }) {
  const ref = useRef$S(null);
  useEffect$S(() => {
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
  return <div ref={ref} className={`zoom-img ${className}`}>{children}</div>;
}

// Simple reveal-on-scroll wrapper
function Reveal({ children, as = "div", className = "", delay = 0 }) {
  const ref = useRef$S(null);
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
            <div className="eyebrow">— Our Achievements</div>
            <h2>Fourteen years.<br/><span className="italic-accent">Measurable ground.</span></h2>
          </div>
          <p>Each project is planned to create lasting appreciation — combining prime location, quality, and the assurance of VHG transparency.</p>
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
            <p>Handed over and under development across South India — each RERA-approved and independently verified.</p>
          </div>
          <div className="ach-cell">
            <div className="ach-num"><CountUp to={78} /><sup>L</sup></div>
            <div className="ach-label">Sq. ft. So Far</div>
            <p>Master-planned across 34 completed and 5 upcoming layouts, all title-cleared and survey-verified.</p>
          </div>
        </div>

        <div className="ach-foot">
          <p>"We don't sell plots. We hand over clarity — titled, surveyed, zoned, and ready for a life you haven't lived yet."</p>
          <a className="nav-btn solid" href="#contact" style={{ whiteSpace: "nowrap" }}>Contact Us →</a>
        </div>
      </div>
    </section>
  );
}

// ====================== PROJECTS =================
const PROJECTS = [
  { ph: "ph-a", tag: "Flagship", name: "Vel Serenity", loc: "Oragadam · Chennai Metro", status: "Selling", size: "1,200 — 2,400 sq.ft", price: "₹ 42 L+", plots: "128 Plots", phLabel: "AERIAL · LAYOUT" },
  { ph: "ph-b", tag: "New Launch", name: "Vel Aranya", loc: "Hosur Belt · Krishnagiri", status: "Pre-launch", size: "2,400 — 4,800 sq.ft", price: "₹ 18 L+", plots: "240 Plots", phLabel: "FARM · PLOTS" },
  { ph: "ph-c", tag: "Completed", name: "Vel Vistas", loc: "ECR Coastline · Chengalpattu", status: "Delivered", size: "1,800 — 3,600 sq.ft", price: "Sold Out", plots: "86 Plots", phLabel: "COASTAL · VIEW" },
  { ph: "ph-d", tag: "Under Dev.", name: "Vel Meridian", loc: "Sriperumbudur · Industrial Belt", status: "Phase II", size: "1,200 — 1,800 sq.ft", price: "₹ 32 L+", plots: "196 Plots", phLabel: "GATED · COMMUNITY" },
  { ph: "ph-e", tag: "Featured", name: "Vel Horizon", loc: "Coimbatore · West Gateway", status: "Selling", size: "2,000 — 4,000 sq.ft", price: "₹ 28 L+", plots: "160 Plots", phLabel: "HILLSIDE · LAYOUT" },
  { ph: "ph-f", tag: "Upcoming", name: "Vel Solace", loc: "Trichy · Kaveri Corridor", status: "Announced", size: "1,500 — 3,000 sq.ft", price: "₹ 22 L+", plots: "180 Plots", phLabel: "RIVERSIDE · PLOTS" },
];

function Projects() {
  return (
    <section className="projects" id="properties" data-screen-label="03 Projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">— Our Projects</div>
            <h2>Where land becomes<br/><span className="italic-accent">an address.</span></h2>
          </div>
          <p>Six active developments across Tamil Nadu's most strategic growth corridors — from Chennai's industrial belt to Coimbatore's west gateway. All RERA-approved. All survey-verified.</p>
        </Reveal>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} className="proj-card" delay={i * 60}>
              <div className="proj-media">
                <span className="badge">{p.tag}</span>
                <span className="price">{p.price}</span>
                <ZoomFrame className={`ph ${p.ph}`}>
                  <span className="ph-label">{p.phLabel}</span>
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
  { n: "03", t: "Assured appreciation", d: "Every location is pre-qualified against a 7-factor growth matrix — infra, industry, accessibility, zoning." },
  { n: "04", t: "Lifelong customer support", d: "One relationship manager from enquiry to handover — and for every registration, re-sale or question after." },
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
            <div className="eyebrow">— How we add value</div>
            <h2>Not just land.<br/><span className="italic-accent">A living ecosystem.</span></h2>
          </div>
          <p>VHG offers not just land but a complete living ecosystem — from zoned layouts to amenity-rich communities that enhance comfort, security and long-term growth.</p>
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
            <ZoomFrame className="ph"></ZoomFrame>
          </Reveal>
          <Reveal>
            <div className="founder-body">
              <div className="eyebrow">— Founder's Message</div>
              <h2>Land should not only<br/>be profitable.<br/><span className="italic-accent">It should be purposeful.</span></h2>
              <blockquote className="founder-quote">
                "When we started Vel Homes Global, our goal was simple yet uncompromising — to make land investments accessible to every family, with clarity in property appreciation."
              </blockquote>
              <p>We believed every family should own land with confidence, and every investor should see measurable growth from their decision. Each project we launch is personally overseen to ensure our customers get more than plots — they get peace of mind and a foundation for their future.</p>
              <p>Our journey is driven by a belief that real estate should connect communities and create value that lasts generations.</p>
              <div className="founder-sign">
                <div style={{fontFamily:"var(--display)", fontSize:28, fontStyle:"italic", color:"var(--gold)"}}>J.</div>
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
const TESTIMONIALS = [
  { quote: "VHG handed over the plot exactly as promised — title cleared, survey marked, and infrastructure in place before we registered. Fourteen months later, the valuation had grown 34%.", name: "R. Senthilkumar", role: "Owner · Vel Serenity · Plot 42", loc: "Chennai" },
  { quote: "I've invested through three developers in Tamil Nadu. Only VHG gave me a dedicated relationship manager who still answers my calls four years after the purchase.", name: "Meera Rajagopalan", role: "Investor · Vel Vistas", loc: "Bengaluru" },
  { quote: "As a landowner, the Alliance Program gave us a fair share of upside while VHG handled every permission, survey, and marketing concern. My father would be proud.", name: "A. Krishnamurthy", role: "Land Partner · Hosur Belt", loc: "Krishnagiri" },
];

function Testimonials() {
  const [i, setI] = useState$S(0);
  useEffect$S(() => {
    const t = setInterval(() => setI(x => (x + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const cur = TESTIMONIALS[i];

  return (
    <section className="testimonials" id="testimonials" data-screen-label="06 Testimonials">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{color:"var(--gold)"}}>— Trusted by 500+ families</div>
          <h2>Families, investors & institutions —<br/>trusted with their heart<br/><span className="italic-accent">and soul in VHG.</span></h2>
        </Reveal>
        <div className="testimonial-card" key={i}>
          <div className="quote-mark">"</div>
          <blockquote>{cur.quote}</blockquote>
          <div className="testimonial-meta">
            <div className="avatar"></div>
            <div style={{textAlign:"left"}}>
              <b>{cur.name}</b>
              <small>{cur.role} · {cur.loc}</small>
            </div>
          </div>
        </div>
        <div className="testimonial-nav">
          {TESTIMONIALS.map((_, idx) => (
            <div key={idx} className={`t-dot ${idx === i ? "active" : ""}`} onClick={() => setI(idx)} />
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
            <div className="eyebrow">— Latest Insights</div>
            <h2>Intelligence from<br/><span className="italic-accent">the ground up.</span></h2>
          </div>
          <p>Market reports, investment guides and location intelligence — published monthly by our in-house research team.</p>
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
  { ph: "ph-c", tag: "For Landowners", title: "Alliance Program", text: "Convert your land into a premium VHG layout — with a fair share of the upside." },
];

function Connect() {
  return (
    <section className="connect" id="contact" data-screen-label="08 Connect">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">— Connect with VHG</div>
            <h2>Three doors.<br/><span className="italic-accent">One destination.</span></h2>
          </div>
          <p>Whether you're buying your first plot, scaling a portfolio, or partnering a parcel of land — here's where your VHG journey begins.</p>
        </Reveal>

        <div className="connect-grid">
          {CONNECT.map((c, i) => (
            <Reveal key={i} className="connect-card" delay={i * 100}>
              <div className="connect-media">
                <ZoomFrame className={`ph ${c.ph}`}></ZoomFrame>
              </div>
              <div className="connect-body">
                <div className="eyebrow">— {c.tag}</div>
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
          <div className="eyebrow">— Turn Land into Prosperity</div>
          <h2>Every VHG development is built on<br/>clarity, quality &<br/><span className="italic-accent">commitment.</span></h2>
          <p>Whether you build, invest, or partner — your journey to prosperity begins here.</p>
          <div className="cta-buttons">
            <a className="btn primary" href="#">Book a Site Visit <span>→</span></a>
            <a className="btn ghost" href="#">Explore Projects</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Achievements, Projects, Value, Founder, Testimonials, Insights, Connect, CtaBand });
