import React, { useState, useEffect } from 'react';

const AMENITIES_DATA = [
  "30 feet road",
  "High ground water",
  "Electricity",
  "24 X 7 Bus Service",
  "Schools and Colleges",
  "High raise walls"
];

const VEL_PROPERTIES = [
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
    img: "/layouts/GlobalCityArch.jpeg",
    layoutImg: "/layouts/global-city-layout.jpeg",
    locationImg: "/layouts/global-city-location.png",
    amenitiesImg: "/layouts/global-city-amenities.png"
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
    img: "/layouts/golden-city.png",
    layoutImg: "/layouts/golden-city.png"
  },
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
    img: "/layouts/mahalakshmi-nagar.png",
    layoutImg: "/layouts/mahalakshmi-nagar.png"
  }
];

function PropertyShowcase() {
  const [activePropId, setActivePropId] = useState(VEL_PROPERTIES[0].id); // First property as default
  const [activeTab, setActiveTab] = useState("details");

  const activeProp = VEL_PROPERTIES.find(p => p.id === activePropId);
  
  useEffect(() => {
    const handleScroll = () => {
      const detailsEl = document.getElementById('ps-content-area');
      const layoutEl = document.getElementById('layout-section');
      const locationEl = document.getElementById('location-section');
      const amenitiesEl = document.getElementById('amenities-section');

      const checkActive = () => {
        if (amenitiesEl && amenitiesEl.getBoundingClientRect().top <= 250) return 'amenities';
        if (locationEl && locationEl.getBoundingClientRect().top <= 250) return 'location';
        if (layoutEl && layoutEl.getBoundingClientRect().top <= 250) return 'layout';
        if (detailsEl && detailsEl.getBoundingClientRect().top <= 400) return 'details';
        return null;
      };

      const newTab = checkActive();
      if (newTab) {
        setActiveTab(prev => (prev !== newTab ? newTab : prev));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
    setActiveTab(tab);
    
    if (tab === "layout") {
      const el = document.getElementById('layout-section');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (tab === "location") {
      const el = document.getElementById('location-section');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (tab === "amenities") {
      const el = document.getElementById('amenities-section');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById('ps-content-area');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="property-showcase" id="property-showcase" style={{ paddingBottom: 0 }}>
      {/* Selection Tabs */}
      <div className="ps-selector-wrap" style={{ background: '#42637A', borderBottom: '1px solid #d6d6d6', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="wrap" style={{ padding: '0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          <h3 style={{ margin: 0, color: 'var(--accent-bright)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Our New Launch</h3>
          
          <div style={{ display: 'flex', gap: '16px', padding: '0', flexWrap: 'wrap', justifyContent: 'center' }}>
            {VEL_PROPERTIES.map(p => (
              <button 
                key={p.id}
                onClick={() => setActivePropId(p.id)}
                className={`ps-prop-btn ${activePropId === p.id ? 'active' : ''}`}
                style={{
                  background: activePropId === p.id ? '#ffffff' : 'rgba(255,255,255,0.1)',
                  color: activePropId === p.id ? '#2F2954' : '#ffffff',
                  border: '1px solid',
                  borderColor: activePropId === p.id ? '#ffffff' : 'rgba(255,255,255,0.2)',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap'
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="section-subnav">
        <div className="section-subnav-inner">
          <a href="#details" className={activeTab === "details" ? "active" : ""} onClick={(e) => handleTabClick(e, "details")}>Property Details</a>
          <a href="#layout" className={activeTab === "layout" ? "active" : ""} onClick={(e) => handleTabClick(e, "layout")}>Layout</a>
          <a href="#location" className={activeTab === "location" ? "active" : ""} onClick={(e) => handleTabClick(e, "location")}>Location</a>
          <a href="#amenities" className={activeTab === "amenities" ? "active" : ""} onClick={(e) => handleTabClick(e, "amenities")}>Amenities</a>
        </div>
      </div>

      {/* Details Content */}
      <div className="ps-content wrap" id="ps-content-area">
        <div className="ps-grid">
          
          {/* Left Media */}
          <div className="ps-media">
            <div className="ps-media-side-tab">
              <span>Discover plot</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2"/></svg>
            </div>
            <div className="layout-img" style={{ backgroundImage: `url(${activeProp.img})`, width: '100%', height: '100%', minHeight: '500px', filter: 'grayscale(0%)' }}></div>
            
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
      
      {/* Layout Section */}
      {activeProp.layoutImg && (
        <div id="layout-section" className="wrap" style={{ marginTop: '80px', paddingBottom: '80px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center', color: 'var(--ink)' }}>Project Layout</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#7c3aed' }}></span>
              <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Soldout</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Blocked</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ffffff', border: '2px solid #000000' }}></span>
              <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available</span>
            </div>
          </div>

          <img src={activeProp.layoutImg} alt={`${activeProp.name} Layout`} style={{ width: '100%', borderRadius: '16px' }} />
        </div>
      )}

      {/* Location Section */}
      {activeProp.locationImg && (
        <div id="location-section" className="wrap" style={{ paddingTop: '80px', paddingBottom: '80px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center', color: 'var(--ink)' }}>Project Location</h2>
          <img src={activeProp.locationImg} alt={`${activeProp.name} Location`} style={{ width: '100%', borderRadius: '16px' }} />
        </div>
      )}

      {/* Amenities Section - Creative Layout */}
      <div id="amenities-section" style={{ background: 'var(--ink)', paddingTop: '100px', paddingBottom: '100px' }}>
        <style>{`
          .creative-amenity-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 24px;
            display: flex;
            align-items: center;
            gap: 20px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            cursor: default;
          }
          .creative-amenity-card:hover {
            transform: translateY(-8px);
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }
          .creative-amenity-card::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 50%; height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent);
            transform: skewX(-20deg);
            transition: 0.5s;
          }
          .creative-amenity-card:hover::before {
            left: 150%;
          }
        `}</style>
        
        <div className="wrap" style={{ maxWidth: '1500px', padding: '0 40px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', color: '#ffffff', margin: 0 }}>Project Amenities</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px', alignItems: 'center' }}>
            {/* Left Media - Amenities Image */}
            <div style={{ width: '100%' }}>
              {activeProp.amenitiesImg ? (
                <img 
                  src={activeProp.amenitiesImg} 
                  alt={`${activeProp.name} Amenities`} 
                  style={{ 
                    width: '100%', 
                    aspectRatio: '16/9', 
                    objectFit: 'cover', 
                    borderRadius: '24px 0 0 24px', 
                    display: 'block',
                    WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, black 50%, transparent 100%)'
                  }} 
                />
              ) : (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', width: '100%', aspectRatio: '16/9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Visual Coming Soon</div>
                </div>
              )}
            </div>
            
            {/* Right Details - Creative Amenities Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {AMENITIES_DATA.map((item, idx) => (
                <div key={idx} className="creative-amenity-card" style={{ justifyContent: 'center', textAlign: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '15px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyShowcase;
