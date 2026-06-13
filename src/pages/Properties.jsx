import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const PROJECTS = [
  // Ongoing
  { id: 1, name: "Mahalakshmi Nagar", loc: "Perambalur", cat: "Residential", status: "Selling", price: "Contact Us", area: "95,348", plots: "74", rera: "Applied", img: "/layouts/mahalakshmi-nagar.png", badge: "Ongoing" },
  { id: 2, name: "Global City", loc: "Puthirankottai", cat: "Residential", status: "New Launch", price: "Contact Us", area: "61,028", plots: "47", rera: "Applied", img: "/layouts/GlobalCityArch.jpeg", badge: "New Launch" },
  { id: 3, name: "Golden City", loc: "Kariayamanikam", cat: "Residential", status: "New Launch", price: "Contact Us", area: "73,013", plots: "61", rera: "Applied", img: "/layouts/golden-city.png", badge: "New Launch" },
  // Completed
  { id: 4, name: "Sri Thanvanthiri Swamy Nagar", loc: "Panruti", cat: "Residential", status: "Completed", price: "Sold Out", area: "12,488", plots: "11", rera: "-", img: "/layouts/sri-thanvanthri.png" },
  { id: 5, name: "Udhayam Farm Land", loc: "Poothurai", cat: "Farm", status: "Completed", price: "Sold Out", area: "3,16,320", plots: "34", rera: "-", img: "/layouts/udhayam-farm.png" },
  { id: 6, name: "Om Ganapathy Nagar", loc: "Sulur", cat: "Residential", status: "Completed", price: "Sold Out", area: "27,065", plots: "19", rera: "-", img: "/layouts/om-ganapathy.png" },
  { id: 7, name: "JK Industrial", loc: "Navamalkapper", cat: "Commercial", status: "Completed", price: "Sold Out", area: "1,55,021", plots: "16", rera: "-", img: "/layouts/jkr-city.png" },
  { id: 8, name: "Tamilvel Nagar", loc: "Siruvadi", cat: "Residential", status: "Completed", price: "Sold Out", area: "1,32,829", plots: "224", rera: "-", img: "/layouts/tamilvel-nagar.png" },
  { id: 9, name: "Selvavel Nagar", loc: "Siruvadi", cat: "Residential", status: "Completed", price: "Sold Out", area: "54,767", plots: "34", rera: "-", img: "/layouts/selvavel-nagar.png" },
  { id: 10, name: "JKR City", loc: "V Agaram", cat: "Residential", status: "Completed", price: "Sold Out", area: "1,38,143", plots: "145", rera: "-", img: "/layouts/jkr-city.png" },
  { id: 11, name: "Sundaramurthi Vinayagar Nagar", loc: "Perangiyur", cat: "Residential", status: "Completed", price: "Sold Out", area: "57,833", plots: "47", rera: "-", img: "/layouts/smv-nagar.png" },
  { id: 12, name: "JL Industry", loc: "Navamalkapper", cat: "Commercial", status: "Completed", price: "Sold Out", area: "24,634", plots: "3", rera: "-", img: "/layouts/jkr-city.png" },
];

function PinIcon() { return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 11s4-3.5 4-7a4 4 0 10-8 0c0 3.5 4 7 4 7z" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="4.2" r="1.4" fill="currentColor"/></svg>; }

function PropertiesPage() {

  return (
    <React.Fragment>
      <Nav />

      <section className="page-hero" data-screen-label="01 Properties Hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Properties</span></div>
          <div className="eyebrow" style={{color:"rgba(255,255,255,0.9)"}}>34 Completed · 9 Active</div>
          <h1>Land that <em>grows</em><br/>with your family.</h1>
          <p>Master-planned plotted developments across Tamil Nadu's fastest-growing corridors RERA-approved, infrastructure-ready, and backed by VHG's 24-month warranty.</p>
        </div>
      </section>

      <section className="page-body" data-screen-label="02 Properties List">
        <div className="proj-list">
          {PROJECTS.map(p => (
            <article className="proj-list-card" key={p.id}>
              <div className="proj-list-media">
                <div className="layout-img" style={{ backgroundImage: `url(${p.img})`, position: 'absolute', inset: 0 }}></div>
                {p.badge && <div className="badge">{p.badge}</div>}
                <div className="price">From {p.price}</div>
              </div>
              <div className="proj-list-body">
                <h3>{p.name}</h3>
                <div className="proj-list-loc"><PinIcon />{p.loc}</div>
                <div className="proj-list-stats">
                  <div className="proj-list-stat"><small>Area</small><b>{p.area} sqft</b></div>
                  <div className="proj-list-stat"><small>Plots</small><b>{p.plots}</b></div>
                  <div className="proj-list-stat"><small>Status</small><b>{p.status}</b></div>
                </div>
                <div style={{paddingTop:14,fontSize:11,fontFamily:"var(--sans)",letterSpacing:"0.14em",fontWeight:600,color:"var(--muted-dark)",textTransform:"uppercase"}}>RERA · {p.rera}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band" data-screen-label="03 Properties CTA">
        <div className="wrap">
          <div className="eyebrow" style={{color:"var(--accent-bright)"}}>Plan a visit</div>
          <h2>Walk the layout.<br/><em>Decide on the land.</em></h2>
          <p>Free weekend site visits from Chennai, Coimbatore, Hosur and Bengaluru transport both ways, no obligation.</p>
          <div className="cta-buttons">
            <a className="btn primary" href="contact.html">Book a Site Visit →</a>
            <a className="btn ghost" href="contact.html">Speak to an Advisor</a>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}



export default PropertiesPage;
