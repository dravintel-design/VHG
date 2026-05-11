import React, { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
const { useState: useStateI } = React;

const ARTICLES = [
  { id: 1, cat: "Market Reports", date: "Apr 2026", read: "12 min", title: "Tamil Nadu Plotted Market — Q1 2026 Outlook", excerpt: "Industrial corridor demand, NRI flows, and the new RERA disclosure regime — what every plot buyer should know this quarter.", ph: "ph-a", featured: true },
  { id: 2, cat: "Investment Guides", date: "Mar 2026", read: "8 min", title: "Why plotted land outperforms apartments over 7-year horizons", excerpt: "Across our customer base, plot CAGR has averaged 18.4% versus 6.1% for comparable apartments. The structural reasons matter.", ph: "ph-b" },
  { id: 3, cat: "Legal & RERA", date: "Mar 2026", read: "6 min", title: "Reading a title chain — a plain-English handbook", excerpt: "Mother documents, encumbrance certificates, patta verification — what each one says, and what it doesn't.", ph: "ph-c" },
  { id: 4, cat: "Location Intelligence", date: "Feb 2026", read: "10 min", title: "The Hosur belt — why every infrastructure dollar is heading south of Bengaluru", excerpt: "Bharat Mala, the Bengaluru-Chennai expressway, and three industrial parks are converging on a 40km corridor.", ph: "ph-d" },
  { id: 5, cat: "Buyer Handbook", date: "Feb 2026", read: "14 min", title: "Your first plot — a 12-step checklist", excerpt: "From shortlisting locations to signing your sale deed, the only checklist you need before your first plot purchase.", ph: "ph-e" },
  { id: 6, cat: "Case Studies", date: "Jan 2026", read: "7 min", title: "Vel Anbu — the layout that sold out in 11 days", excerpt: "What pricing strategy, pre-launch access, and a single Whatsapp video did for our fastest-selling project ever.", ph: "ph-f" },
  { id: 7, cat: "Market Reports", date: "Jan 2026", read: "9 min", title: "ECR Coastline — premium plotted demand finally inflecting", excerpt: "Five years of dormancy, then a step-change in 2025. What the data shows about the next leg.", ph: "ph-a" },
  { id: 8, cat: "Investment Guides", date: "Dec 2025", read: "11 min", title: "NRI plot purchase from start to finish", excerpt: "RBI compliance, FEMA implications, repatriation rules — the complete operational playbook for NRIs.", ph: "ph-b" },
  { id: 9, cat: "Legal & RERA", date: "Dec 2025", read: "5 min", title: "RERA in Tamil Nadu — what changed in 2025", excerpt: "New disclosure norms, mandatory infrastructure timelines, and the buyer protections that actually matter.", ph: "ph-c" },
];

const CATS = ["All", "Market Reports", "Investment Guides", "Legal & RERA", "Location Intelligence", "Buyer Handbook", "Case Studies"];

function InsightsPage() {
  const [cat, setCat] = useStateI("All");
  const featured = ARTICLES.find(a => a.featured);
  const sideOnes = ARTICLES.filter(a => !a.featured).slice(0, 3);
  const list = ARTICLES.filter(a => !a.featured && (cat === "All" || a.cat === cat));

  return (
    <React.Fragment>
      <Nav />

      <section className="page-hero" data-screen-label="01 Insights Hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Blogs & Insights</span></div>
          <div className="eyebrow" style={{color:"rgba(255,255,255,0.9)"}}>— Quarterly reports · monthly guides</div>
          <h1>The thinking <em>behind</em><br/>the land we sell.</h1>
          <p>Market reports, investment frameworks, legal explainers, and case studies — written by our analysts, planners and lawyers for buyers who want to understand what they're buying.</p>
        </div>
      </section>

      <section className="page-body" data-screen-label="02 Featured">
        <div className="insights-featured">
          <a className="feat-main" href="#">
            <div className="ph"></div>
            <div className="feat-main-content">
              <div className="meta"><span className="tag">{featured.cat}</span><span>{featured.date}</span><span>{featured.read} read</span></div>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
            </div>
          </a>
          <div className="feat-side">
            <div className="eyebrow">— More this month</div>
            {sideOnes.map(s => (
              <a className="feat-side-item" key={s.id} href="#">
                <div className="meta"><span className="tag">{s.cat}</span><span>{s.read} read</span></div>
                <h4>{s.title}</h4>
              </a>
            ))}
          </div>
        </div>

        <div className="filter-bar" style={{position:"relative",borderTop:"1px solid var(--line)",marginBottom:60}}>
          <div className="filter-bar-inner">
            {CATS.map(c => (
              <button key={c} className={`filter-chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
                {c}{c !== "All" && <small>{ARTICLES.filter(a => a.cat === c).length}</small>}
              </button>
            ))}
            <div className="filter-spacer"></div>
            <div className="filter-result"><b>{list.length}</b> articles</div>
          </div>
        </div>

        <div className="insights-grid">
          {list.map(a => (
            <a className="ins-list-card" key={a.id} href="#">
              <div className="ins-list-media"><div className={`ph ${a.ph}`}></div></div>
              <div className="meta"><span className="tag">{a.cat}</span><span>{a.date}</span><span>{a.read} read</span></div>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <div className="read">Read article →</div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}



export default InsightsPage;
