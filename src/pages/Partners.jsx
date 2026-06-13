import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
const PROGRAMS = [
  { id: "land", num: "01", tag: "For Landowners", title: "Land Alliance Program", desc: "Convert your ancestral or inherited land into a premium VHG layout without spending a rupee. We take care of approvals, infrastructure, marketing and sales. You receive either a fixed share of proceeds or finished plots back.", points: ["Minimum 5-acre parcel", "Joint Development Agreement, registered", "Zero upfront cost to landowner", "Quarterly payouts during sales cycle"] },
  { id: "channel", num: "02", tag: "For Real-Estate Agents", title: "Channel Partner Network", desc: "A formal partnership for licensed agents and consultants. Earn 2–3.5% commission on closed sales, plus quarterly tier bonuses. We provide co-branded collateral, lead routing, and training on every active layout.", points: ["2–3.5% commission, paid in 30 days", "Tiered quarterly bonuses (Silver / Gold / Platinum)", "Co-branded brochures and digital assets", "Dedicated partner success manager"] },
  { id: "investor", num: "03", tag: "For Domestic Investors", title: "Investor Alliance", desc: "A high-touch investor relationship for those committing ₹1 Cr+ across two or more projects. Pre-launch access 30 days before public sale, tiered pricing, and institutional-grade quarterly performance reports.", points: ["30-day pre-launch window", "Volume-based pricing tiers", "Quarterly performance reports", "Annual VHG Investor Summit"] },
  { id: "global", num: "04", tag: "For NRIs", title: "Global Investor Connect", desc: "Built for NRIs across UAE, Singapore, USA, UK and Australia. End-to-end remote purchase title diligence, registration via PoA, NRE/NRO routing, and post-purchase asset management coordinated by a single relationship manager working across timezones.", points: ["Remote registration via Power-of-Attorney", "NRE/NRO payment guidance", "Cross-timezone relationship management", "Annual portfolio review video call"] },
  { id: "referral", num: "05", tag: "For Existing Customers", title: "VHG Referral Circle", desc: "If you've bought a plot from us, refer a friend or family member and earn ₹50,000–₹2,00,000 per closed sale, depending on plot value. No cap on referrals. Member portal tracks every referral end-to-end.", points: ["₹50K–₹2L per closed sale", "No cap on number of referrals", "Member portal with live tracking", "180-day referral attribution window"] },
  { id: "thematic", num: "06", tag: "For Brands & Institutions", title: "Thematic Collaborations", desc: "We partner with banks, insurance firms, wealth-management platforms and institutional employers to deliver structured plot-investment programs to their customers and employees including bulk pricing, financing tie-ups and on-site activations.", points: ["Bulk pricing for cohorts of 10+", "Financing partnerships with major banks", "Co-hosted investor education events", "Employer-led benefit structures"] },
  { id: "vendor", num: "07", tag: "For Suppliers", title: "Vendor & Contractor Network", desc: "Civil contractors, surveyors, landscape architects, security firms, drainage engineers VHG's empanelled vendor network gets first call on every new layout. Pre-qualified, pre-rated, paid on time.", points: ["Annual empanelment audit", "Standardised payment terms (30 days)", "Long-term volume contracts", "Quality scorecard for repeat work"] },
];

function PartnersPage() {
  return (
    <React.Fragment>
      <Nav />

      <section className="page-hero" data-screen-label="01 Partners Hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Partner Programs</span></div>
          <div className="eyebrow" style={{color:"rgba(255,255,255,0.9)"}}>7 Programs · 1,200+ Active Partners</div>
          <h1>Grow with us, <em>not just</em><br/>around us.</h1>
          <p>Seven distinct partnership tracks for landowners, agents, investors, NRIs, customers, brands and vendors each with clear terms, predictable payouts, and a real human relationship.</p>
        </div>
      </section>

      <section className="page-body" data-screen-label="02 Programs">
        <div className="partners-intro">
          <div>
            <div className="eyebrow">The VHG Partner Ecosystem</div>
            <h2>Different relationships,<br/><em>same standard.</em></h2>
          </div>
          <p>Whether you're contributing 5 acres of family land or referring a single neighbour the same diligence, transparency and timeliness apply. Pick the program that fits where you are, and a member of our partnerships team will be in touch within 24 hours.</p>
        </div>

        <div className="program-list">
          {PROGRAMS.map(p => (
            <a href="contact.html" className="program-row" key={p.id} id={p.id} style={{ textDecoration: 'none', color: 'inherit', display: 'grid', alignItems: 'center' }}>
              <div className="program-num" style={{ alignSelf: 'start' }}>{p.num}</div>
              <div className="program-info" style={{ alignSelf: 'start' }}>
                <div className="program-tag">{p.tag}</div>
                <h3>{p.title}</h3>
              </div>
              <div className="program-desc" style={{ alignSelf: 'start' }}>
                <p>{p.desc}</p>
                <ul>{p.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
              </div>
              <div className="program-action" style={{ display: 'flex', justifyContent: 'flex-end', color: 'var(--sea)', paddingRight: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="cta-band" data-screen-label="03 Partners CTA">
        <div className="wrap">
          <div className="eyebrow" style={{color:"var(--accent-bright)"}}>Not sure where you fit?</div>
          <h2>Tell us your story.<br/><em>We'll find your fit.</em></h2>
          <p>A 20-minute call with our partnerships team is the fastest way to see which VHG program is right for you.</p>
          <div className="cta-buttons">
            <a className="btn primary" href="contact.html">Schedule a Call →</a>
            <a className="btn ghost" href="mailto:partners@velhomesglobal.com">partners@velhomesglobal.com</a>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}



export default PartnersPage;
