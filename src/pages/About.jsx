import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../about.css';
// About page combines Our Story, Vision & Mission, Founder's Message, FAQs

const TIMELINE = [
  { year: "2011", title: "Founded in Chennai", text: "Vel Homes Global registered by Mr. Jambulingam with a single 8-acre layout in Sriperumbudur." },
  { year: "2014", title: "First 1,000 plots", text: "Milestone crossed all titled, surveyed, RERA-approved and handed over on time." },
  { year: "2017", title: "Coimbatore expansion", text: "West Gateway layout launches, introducing VHG to South India's second-largest metro." },
  { year: "2020", title: "Alliance Program", text: "Landowner Alliance formalised five heritage parcels joined the VHG ecosystem." },
  { year: "2023", title: "3,000th plot handed over", text: "Vel Serenity Phase II completion marks a new standard for gated plotted communities." },
  { year: "2026", title: "Global Investor Connect", text: "Cross-border investor platform opens for NRIs across UAE, Singapore and the US." },
];

const FAQ_CATS = [
  { id: "buying", label: "Buying a Plot", count: 6 },
  { id: "investment", label: "Investment & Returns", count: 5 },
  { id: "legal", label: "Legal & RERA", count: 4 },
  { id: "partner", label: "Partner Programs", count: 4 },
];

const FAQS = {
  buying: [
    { q: "How do I book a plot with VHG?", a: "Start with a site visit our team schedules transport from Chennai, Coimbatore and Bengaluru. After visiting, you can block a plot with a refundable token amount. You then receive an Allotment Letter within 48 hours, followed by agreement-for-sale and registration." },
    { q: "What does 'RERA-approved' mean for VHG layouts?", a: "Every Vel Homes Global layout is registered with the Tamil Nadu Real Estate Regulatory Authority before any plot is sold. This means approved master plan, verified title, committed timelines for infrastructure, and legal recourse if any commitment is breached." },
    { q: "Can NRIs buy VHG plots?", a: "Yes. NRIs can purchase plotted land in Tamil Nadu without RBI approval. VHG provides power-of-attorney documentation, remote registration support, NRE/NRO payment guidance, and an NRI relationship manager who works across timezones." },
    { q: "What payment schedules are available?", a: "We offer three structures: (1) full payment at registration with a 3–5% discount, (2) a 30/60/90-day milestone plan tied to infrastructure stages, and (3) home-loan funding via our partner banks (SBI, HDFC, ICICI, Axis)." },
    { q: "Can I visit a project before booking?", a: "Absolutely and we strongly encourage it. Free weekend site visits run every Saturday and Sunday from Chennai, Coimbatore, Hosur and Bengaluru. Our drivers pick you up, tour the layout with a senior planner, and drop you back. No obligation." },
    { q: "Do plots come with any construction support?", a: "While the plot itself is sold ready-to-build, VHG partners with five empanelled architects and three civil contractors who offer VHG customers preferred pricing and pre-approved designs fitting each layout's zoning." },
  ],
  investment: [
    { q: "What kind of appreciation has VHG delivered historically?", a: "Across our 34 completed layouts, average annual appreciation has ranged from 14% to 28% CAGR over holding periods of 3–7 years. Exact numbers vary by corridor our Investor Report (published quarterly) has location-level data." },
    { q: "How does VHG select locations?", a: "We apply a 7-factor growth matrix: state infrastructure committed, industrial investment within 25 km, accessibility (highways, metro, airport), municipal zoning, water table, existing demographic momentum, and comparable exit rates. A location must score 5/7 to be considered." },
    { q: "Is plotted land better than apartments as an investment?", a: "They serve different goals. Apartments offer rental yield (2–4%) but depreciate as a structure. Land appreciates, has near-zero maintenance, and lets you build when ready. For long-horizon (5+ years) investors, plotted land has historically outperformed residential flats in Tamil Nadu tier-1 corridors." },
    { q: "What are the carrying costs?", a: "Annual property tax varies by panchayat (₹2–8 per sq.ft typically). VHG-managed gated communities add a maintenance charge of ₹1–2/sq.ft/month for common-area upkeep, security and landscaping. Non-gated layouts have zero recurring charges." },
    { q: "Can I exit my investment easily?", a: "VHG operates a Resale Assistance Program we list your plot in our buyer network at no commission for the first 90 days. Historical average time-to-sell for a VHG plot has been 4.2 months." },
  ],
  legal: [
    { q: "Is the title fully clear on VHG plots?", a: "Every VHG layout goes through a 120-day legal diligence before launch parent document scrutiny, 30-year encumbrance certificate, patta verification, survey cross-check and no-objection from all sharers. We publish the full title opinion to every buyer." },
    { q: "What documents do I receive on purchase?", a: "At registration you receive: Sale Deed (registered), mother documents chain, encumbrance certificate, patta transfer confirmation, RERA registration copy, approved master plan, and the VHG Infrastructure Warranty." },
    { q: "What is the VHG Infrastructure Warranty?", a: "A written commitment that roads, drainage, street-lighting, water-line conduits and boundary walls will be completed and maintained for 24 months from handover. Any defect during that window is repaired at VHG's cost." },
    { q: "What taxes and fees apply?", a: "Stamp duty in Tamil Nadu is 7% of guideline value; registration charge is 4%. GST does not apply to plotted land sales. VHG's price is transparent no hidden charges, no 'amenity fees', no 'preferred location charges' beyond what is quoted." },
  ],
  partner: [
    { q: "How does the Land Alliance Program work?", a: "Landowners contribute a parcel (minimum 5 acres) and VHG develops, markets and sells it. Owners receive either (a) a fixed share of sale proceeds, or (b) a set of finished plots back, based on a pre-signed Joint Development Agreement. Zero upfront cost to the landowner." },
    { q: "Who qualifies as a VHG Channel Partner?", a: "Licensed real-estate agents, property consultants and IFA networks with at least 2 years of track record can apply. Approved partners receive 2–3.5% commission on closed sales, quarterly incentives, and co-branded marketing collateral." },
    { q: "What does the Investor Alliance Network offer?", a: "Pre-launch access (30 days before public sale), tiered pricing based on commitment size, institutional-grade quarterly reporting, and invitation to our annual Investor Summit. Minimum entry: a commitment of ₹1 Cr across two or more projects." },
    { q: "How do I refer a buyer as a VHG Referral Circle member?", a: "Submit the referral through your member portal. If the buyer registers within 180 days, you receive a ₹50,000–₹2,00,000 referral fee depending on plot value. No cap on number of referrals per member." },
  ],
};

// Reveal hook
function useRevealA(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return inView;
}

function RevealA({ children, className = "", as = "div", delay = 0 }) {
  const ref = useRef(null);
  const inView = useRevealA(ref);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

function ZoomA({ children, className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - (r.top + r.height / 2) / (vh + r.height / 2);
      const c = Math.max(0, Math.min(1, p));
      const intensity = (window.__TWEAKS && window.__TWEAKS.zoomIntensity) || 1.1;
      el.style.setProperty("--z", (1 + (intensity - 1) * c).toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={ref} className={`zoom-img ${className}`} style={style}>{children}</div>;
}

function AboutHero() {
  return (
    <section className="about-hero" data-screen-label="01 About Hero">
      <div className="about-hero-inner">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>About Us</span>
        </div>
        <div className="eyebrow">Est. 2011 · Tamil Nadu</div>
        <h1>Land with <em>clarity.</em><br/>Legacy with <em>confidence.</em></h1>
        <p>Fourteen years, 3,200+ plots, and a single philosophy real estate should not just be profitable. It should be purposeful.</p>
      </div>
    </section>
  );
}

function SubNav({ active }) {
  const items = [
    { id: "story", label: "Our Story" },
    { id: "vision", label: "Vision & Mission" },
    { id: "founder", label: "Founder's Message" },
    { id: "faqs", label: "FAQs" },
  ];
  return (
    <nav className="section-subnav">
      <div className="section-subnav-inner">
        {items.map(i => (
          <a key={i.id} href={`#${i.id}`} className={active === i.id ? "active" : ""}>{i.label}</a>
        ))}
      </div>
    </nav>
  );
}

function OurStory() {
  return (
    <section className="story" id="story" data-screen-label="02 Our Story">
      <div className="wrap">
        <div className="story-grid">
          <RevealA className="story-media">
            <ZoomA className="layout-img" style={{ backgroundImage: `url(/uploads/Timeline.png)`, position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center' }}></ZoomA>
          </RevealA>
          <RevealA className="story-body" delay={120}>
            <div className="eyebrow">Our Story</div>
            <h2>A company built plot <em>by plot.</em></h2>
            <p className="lead">"We didn't set out to be a big developer. We set out to be the one a family could trust with their savings."</p>
            <p>Vel Homes Global was founded in 2011 with a single 8-acre parcel in Sriperumbudur and a simple promise that every plot sold would be titled, surveyed, RERA-ready, and handed over exactly as promised.</p>
            <p>Fourteen years later, that promise has scaled into 34 completed layouts, 5 upcoming launches, and 3,200+ plots delivered across Tamil Nadu's fastest-growing corridors from the Chennai industrial belt to the Kaveri basin.</p>
            <p>We remain a family-run company. Every layout is still personally walked by the founder before launch. Every infrastructure warranty is still signed by hand.</p>

            <div className="timeline">
              <h3>Milestones</h3>
              {TIMELINE.map(t => (
                <div className="timeline-row" key={t.year}>
                  <div className="timeline-year">{t.year}</div>
                  <div className="timeline-event">
                    <h4>{t.title}</h4>
                    <p>{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealA>
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="vm" id="vision" data-screen-label="03 Vision & Mission">
      <div className="wrap">
        <RevealA className="vm-head">
          <div className="eyebrow">Vision & Mission</div>
          <h2>The <em>why</em> behind every acre.</h2>
          <p>We believe land is more than an asset class it is the foundation of family memory, financial confidence, and generational wealth. Every decision we make answers to that belief.</p>
        </RevealA>

        <div className="vm-grid">
          <RevealA className="vm-card">
            <div className="num">01 Vision</div>
            <h3>Our Vision</h3>
            <div className="big">To be South India's most trusted name in plotted development where every family, regardless of savings, can own land with confidence.</div>
            <p>We see a Tamil Nadu where a middle-income family and an institutional investor are treated with the same diligence, transparency, and respect because both are building something that will outlast them.</p>
            <div className="vm-pillars">
              <div className="vm-pillar">
                <div className="vm-pillar-bullet"></div>
                <div><b>Democratised ownership</b><small>Plots priced from ₹18L so first-time buyers are not priced out</small></div>
              </div>
              <div className="vm-pillar">
                <div className="vm-pillar-bullet"></div>
                <div><b>Institutional discipline</b><small>Every process audit-ready, with public-facing metrics</small></div>
              </div>
            </div>
          </RevealA>

          <RevealA className="vm-card dark" delay={120}>
            <div className="num">02 Mission</div>
            <h3>Our Mission</h3>
            <div className="big">To deliver plotted land that is verified, zoned, infrastructured, and backed by a 24-month warranty every single time, without exception.</div>
            <p>We measure our mission in unglamorous things: title opinions written, drainage metres laid, trees planted, warranties honoured, relationship managers retained. The headlines follow from the execution.</p>
            <div className="vm-pillars">
              <div className="vm-pillar">
                <div className="vm-pillar-bullet"></div>
                <div><b>120-day legal diligence</b><small>Before a single plot is sold no exceptions</small></div>
              </div>
              <div className="vm-pillar">
                <div className="vm-pillar-bullet"></div>
                <div><b>24-month infrastructure warranty</b><small>Roads, drainage and lighting repaired at our cost</small></div>
              </div>
            </div>
          </RevealA>
        </div>

        <div className="vm-grid" style={{ marginTop: 28 }}>
          <RevealA className="vm-card">
            <div className="num">03 Values</div>
            <h3>Core Values</h3>
            <p>The five principles every VHG decision is tested against from which plot of land we buy to how we answer the phone on a Sunday evening.</p>
            <div className="vm-pillars" style={{ marginTop: 4 }}>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Clarity</b><small>Nothing hidden, nothing rounded up, nothing sold with an asterisk.</small></div></div>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Craft</b><small>We engineer layouts the way architects design homes.</small></div></div>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Community</b><small>A VHG layout is a neighbourhood in waiting, not a grid of rectangles.</small></div></div>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Continuity</b><small>Your relationship manager on day one is still your relationship manager on day 1,500.</small></div></div>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Country</b><small>Every layout contributes to panchayat infrastructure funds beyond the statutory minimum.</small></div></div>
            </div>
          </RevealA>

          <RevealA className="vm-card" delay={120}>
            <div className="num">04 Sustainability</div>
            <h3>Built Gently</h3>
            <p>Our environmental commitment is concrete, not cosmetic baked into the master plan before a road is laid.</p>
            <div className="vm-pillars" style={{ marginTop: 4 }}>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Native-tree canopy</b><small>Minimum 60 native species planted per 10 acres at launch</small></div></div>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Rainwater harvesting</b><small>Every common area and plot design includes a recharge pit</small></div></div>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Solar streetlights</b><small>All VHG-maintained layouts since 2019</small></div></div>
              <div className="vm-pillar"><div className="vm-pillar-bullet"></div><div><b>Zero-encroachment setbacks</b><small>Water bodies, heritage trees and temple lands fully preserved</small></div></div>
            </div>
          </RevealA>
        </div>
      </div>
    </section>
  );
}

function FounderMessage() {
  return (
    <section className="founder-msg" id="founder" data-screen-label="04 Founder Message">
      <div className="wrap">
        <div className="fm-grid">
          <RevealA className="fm-media">
            <ZoomA className="layout-img" style={{ backgroundImage: `url(/uploads/JL.png)`, position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center' }}></ZoomA>
          </RevealA>
          <RevealA className="fm-body" delay={120}>
            <div className="eyebrow">Founder's Message</div>
            <h2>Real estate should not only be profitable.<br/>It should be <em>purposeful.</em></h2>
            <blockquote className="fm-quote">
              "When we started Vel Homes Global, our goal was simple yet uncompromising to make land investments accessible to every family, with clarity in property appreciation."
            </blockquote>
            <p>We believed every family should own land with confidence, and every investor should see measurable growth from their decision. That conviction has carried us through three market cycles and two regulatory overhauls and it's the same conviction that walks every new site with me before we launch it.</p>
            <p>Each project we launch is personally overseen to ensure our customers get more than plots they get peace of mind and a foundation for their future. We don't chase scale for its own sake. We add one layout when we can do it with the same care as the first.</p>
            <p>Our journey is driven by a belief that real estate should connect communities and create value that lasts generations. If you are reading this, you are already part of that story.</p>

            <div className="fm-sign">
              <div className="fm-sign-mark">J.</div>
              <div>
                <b>Mr. Jambulingam</b>
                <small>Founder & CEO · Vel Homes Global</small>
              </div>
            </div>
          </RevealA>
        </div>
      </div>
    </section>
  );
}

function FAQs() {
  const [cat, setCat] = useState("buying");
  const [open, setOpen] = useState(0);
  const items = FAQS[cat];

  useEffect(() => { setOpen(0); }, [cat]);

  return (
    <section className="faqs" id="faqs" data-screen-label="05 FAQs">
      <div className="wrap">
        <RevealA className="faqs-head">
          <div className="eyebrow">Frequently Asked</div>
          <h2>Answers, <em>before</em> you ask.</h2>
          <p>Nineteen of the most common questions we receive from first-time plot buyers to institutional investors. Still stuck? Our team is a phone call away.</p>
        </RevealA>

        <div className="faqs-layout">
          <div className="faqs-cats" role="tablist">
            {FAQ_CATS.map(c => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                className={`faqs-cat ${cat === c.id ? "active" : ""}`}
                onClick={() => setCat(c.id)}
              >
                {c.label}
                <small>{c.count} questions</small>
              </button>
            ))}
          </div>

          <div className="faq-list">
            {items.map((item, i) => (
              <div key={item.q} className={`faq-item ${open === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="about-cta" data-screen-label="06 About CTA">
      <div className="wrap">
        <RevealA>
          <div className="eyebrow" style={{color: "var(--accent-bright)"}}>Begin with a site visit</div>
          <h2>Walk the land.<br/>Meet the team.<br/><em>Decide, slowly.</em></h2>
          <p>Free weekend visits from Chennai, Coimbatore, Hosur and Bengaluru transport both ways, no obligation.</p>
          <div className="cta-buttons">
            <a className="btn primary" href="index.html#contact">Book a Site Visit →</a>
            <a className="btn ghost" href="index.html#properties">Explore Projects</a>
          </div>
        </RevealA>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <React.Fragment>
      <Nav />
      <AboutHero />
      <OurStory />
      <VisionMission />
      <FounderMessage />
      <FAQs />
      <AboutCTA />
      <Footer />
    </React.Fragment>
  );
}



export default AboutPage;
