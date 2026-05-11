import React, { useState } from 'react';

const VEL_PROPERTIES = [
  { 
    id: 1, 
    name: "Mahalakshmi Nagar", 
    status: "Ongoing",
    location: "Perambalur",
    area: "95,348 Sq.ft",
    totalPlots: "74",
    soldPlots: "59",
    availablePlots: "15",
    locLink: "#",
    img: "/layouts/mahalakshmi-nagar.png"
  },
  { 
    id: 2, 
    name: "Global City", 
    status: "New Launch",
    location: "Puthirankottai",
    area: "61,028 Sq.ft",
    totalPlots: "47",
    soldPlots: "16",
    availablePlots: "31",
    locLink: "#",
    img: "/layouts/jkr-city.png"
  },
  { 
    id: 3, 
    name: "Golden City", 
    status: "New Launch",
    location: "Kariayamanikam",
    area: "73,013 Sq.ft",
    totalPlots: "61",
    soldPlots: "8",
    availablePlots: "53",
    locLink: "#",
    img: "/layouts/golden-city.png"
  }
];

function PropertyShowcase() {
  const [activePropId, setActivePropId] = useState(VEL_PROPERTIES[1].id); // Latest as default (Vel Aranya New Launch)
  const [activeTab, setActiveTab] = useState("details");

  const activeProp = VEL_PROPERTIES.find(p => p.id === activePropId);

  return (
    <section className="property-showcase" id="property-showcase">
      {/* Selection Tabs */}
      <div className="ps-selector-wrap" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ padding: '0 60px', display: 'flex', alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '32px', whiteSpace: 'nowrap' }}>
            Select Property:
          </span>
          <div style={{ display: 'flex', gap: '12px', padding: '20px 0' }}>
            {VEL_PROPERTIES.map(p => (
              <button 
                key={p.id}
                onClick={() => setActivePropId(p.id)}
                className={`ps-prop-btn ${activePropId === p.id ? 'active' : ''}`}
                style={{
                  background: activePropId === p.id ? 'var(--ink)' : 'var(--white)',
                  color: activePropId === p.id ? 'var(--white)' : 'var(--ink)',
                  border: `1px solid ${activePropId === p.id ? 'var(--ink)' : 'var(--line)'}`,
                  padding: '10px 24px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  whiteSpace: 'nowrap',
                  boxShadow: activePropId !== p.id ? '0 2px 8px rgba(0,0,0,0.02)' : 'none'
                }}
              >
                {p.name}
                {p.status === 'New Launch' && (
                  <span style={{ 
                    background: activePropId === p.id ? 'var(--accent-bright)' : 'var(--sea)',
                    color: activePropId === p.id ? 'var(--ink)' : 'var(--white)',
                    fontSize: '9px',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>New Launch</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="section-subnav">
        <div className="section-subnav-inner">
          <a href="#details" className={activeTab === "details" ? "active" : ""} onClick={(e) => { e.preventDefault(); setActiveTab("details"); }}>Property Details</a>
          <a href="#layout" className={activeTab === "layout" ? "active" : ""} onClick={(e) => { e.preventDefault(); setActiveTab("layout"); }}>Layout</a>
          <a href="#location" className={activeTab === "location" ? "active" : ""} onClick={(e) => { e.preventDefault(); setActiveTab("location"); }}>Location</a>
          <a href="#amenities" className={activeTab === "amenities" ? "active" : ""} onClick={(e) => { e.preventDefault(); setActiveTab("amenities"); }}>Amenities</a>
          <a href="#about" className={activeTab === "about" ? "active" : ""} onClick={(e) => { e.preventDefault(); setActiveTab("about"); }}>About Project</a>
        </div>
      </div>

      {/* Details Content */}
      <div className="ps-content wrap">
        <div className="ps-grid">
          
          {/* Left Media */}
          <div className="ps-media">
            <div className="ps-media-side-tab">
              <span>Discover plot</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2"/></svg>
            </div>
            <div className="layout-img" style={{ backgroundImage: `url(${activeProp.img})`, width: '100%', height: '100%', minHeight: '500px' }}></div>
            
            <a href="https://wa.me/1234567890" className="whatsapp-float" aria-label="WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.26 4.88L2 22l5.24-1.22A9.95 9.95 0 0012.01 22c5.53 0 10-4.48 10-10s-4.47-10-10-10zm5.12 14.5c-.24.68-1.4 1.3-1.92 1.35-.5.06-1.12.16-3.21-.7-2.5-1.03-4.08-3.6-4.2-3.76-.13-.17-1.02-1.34-1.02-2.57 0-1.22.63-1.83.86-2.07.22-.24.48-.3.64-.3s.32 0 .46.01c.14.01.32-.05.49.36.18.43.6 1.48.66 1.59.05.12.09.25.01.42-.08.17-.12.27-.24.41-.12.14-.25.32-.35.42-.12.13-.25.27-.11.51.14.23.63 1.03 1.35 1.68.93.84 1.71 1.1 1.95 1.21.23.11.37.09.51-.06.14-.15.6-1.74.76-2.34.16-.6.31-.52.53-.44.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z"/></svg>
            </a>
          </div>

          {/* Right Details */}
          <div className="ps-details">
            <h2 className="ps-title">Property<br/>Details</h2>
            
            <div className="ps-stats-grid">
              <div className="ps-stat">
                <small>Project Status:</small>
                <p>{activeProp.status}</p>
              </div>
              <div className="ps-stat">
                <small>Location:</small>
                <p>{activeProp.location}</p>
              </div>
              <div className="ps-stat">
                <small>Total Area:</small>
                <p>{activeProp.area}</p>
              </div>
              <div className="ps-stat">
                <small>Total Plots:</small>
                <p>{activeProp.totalPlots}</p>
              </div>
              <div className="ps-stat">
                <small>Sold Plots:</small>
                <p>{activeProp.soldPlots}</p>
              </div>
              <div className="ps-stat">
                <small>Available Plots:</small>
                <p style={{ color: 'var(--sea)', fontWeight: '700' }}>{activeProp.availablePlots}</p>
              </div>
              <div className="ps-stat" style={{ gridColumn: 'span 2' }}>
                <small>Map Link:</small>
                <p>
                  <a href={activeProp.locLink} className="loc-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/></svg>
                    Locate the Project &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default PropertyShowcase;
