import React, { useState, useEffect } from 'react';

const AMENITIES_DATA = [
  "30 feet road",
  "High ground water",
  "Electricity",
  "24 X 7 Bus Service",
  "Schools and Colleges",
  "High raise walls"
];

const GOLDEN_CITY_AMENITIES = [
  "32 feet road",
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
    img: "/layouts/golden-city-arch.png",
    layoutImg: "/layouts/golden-city-layout.jpeg",
    locationImg: "/layouts/golden-city-location.png",
    amenitiesImg: "/layouts/golden-city-amenities.png"
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
    img: "/layouts/mahalakshmi-nagar-arch.png",
    layoutImg: "/layouts/mahalakshmi-nagar-layout.jpeg",
    locationImg: "/layouts/mahalakshmi-nagar-location.png",
    amenitiesImg: "/layouts/mahalakshmi-nagar-amenities.png"
  }
];

const COMPLETED_PROPERTIES = [
  { id: 4, name: "Sri Thanvanthiri Swamy Nagar", status: "Completed", location: "Panruti", area: "12,488 Sq.ft", totalPlots: "11", soldPlots: "11", availablePlots: "0", locLink: "#", img: "/layouts/sri-thanvanthri.png", layoutImg: "/layouts/sri-thanvanthri.png" },
  { id: 5, name: "Udhayam Farm Land", status: "Completed", location: "Poothurai", area: "3,16,320 Sq.ft", totalPlots: "34", soldPlots: "34", availablePlots: "0", locLink: "#", img: "/layouts/udhayam-farm.png", layoutImg: "/layouts/udhayam-farm.png" },
  { id: 6, name: "Om Ganapathy Nagar", status: "Completed", location: "Sulur", area: "27,065 Sq.ft", totalPlots: "19", soldPlots: "19", availablePlots: "0", locLink: "#", img: "/layouts/om-ganapathy.png", layoutImg: "/layouts/om-ganapathy.png" },
  { id: 7, name: "JK Industrial", status: "Completed", location: "Navamalkapper", area: "1,55,021 Sq.ft", totalPlots: "16", soldPlots: "16", availablePlots: "0", locLink: "#", img: "/layouts/jkr-city.png", layoutImg: "/layouts/jkr-city.png" },
  { id: 8, name: "Tamilvel Nagar", status: "Completed", location: "Siruvadi", area: "1,32,829 Sq.ft", totalPlots: "224", soldPlots: "224", availablePlots: "0", locLink: "#", img: "/layouts/tamilvel-nagar.png", layoutImg: "/layouts/tamilvel-nagar.png" },
  { id: 9, name: "Selvavel Nagar", status: "Completed", location: "Siruvadi", area: "54,767 Sq.ft", totalPlots: "34", soldPlots: "34", availablePlots: "0", locLink: "#", img: "/layouts/selvavel-nagar.png", layoutImg: "/layouts/selvavel-nagar.png" },
  { id: 10, name: "JKR City", status: "Completed", location: "V Agaram", area: "1,38,143 Sq.ft", totalPlots: "145", soldPlots: "145", availablePlots: "0", locLink: "#", img: "/layouts/jkr-city.png", layoutImg: "/layouts/jkr-city.png" },
  { id: 11, name: "Sundaramurthi Vinayagar Nagar", status: "Completed", location: "Perangiyur", area: "57,833 Sq.ft", totalPlots: "47", soldPlots: "47", availablePlots: "0", locLink: "#", img: "/layouts/smv-nagar.png", layoutImg: "/layouts/smv-nagar.png" },
  { id: 12, name: "JL Industry", status: "Completed", location: "Navamalkapper", area: "24,634 Sq.ft", totalPlots: "3", soldPlots: "3", availablePlots: "0", locLink: "#", img: "/layouts/jkr-city.png", layoutImg: "/layouts/jkr-city.png" },
];

const ALL_PROPERTIES = [...VEL_PROPERTIES, ...COMPLETED_PROPERTIES];

function PropertyShowcase({ propertyId }) {
  const [activePropId, setActivePropId] = useState(propertyId ?? VEL_PROPERTIES[0].id); // First property as default

  // Keep in sync when navigating between project pages
  useEffect(() => {
    if (propertyId) setActivePropId(propertyId);
  }, [propertyId]);
  const [activeTab, setActiveTab] = useState("details");

  const activeProp = ALL_PROPERTIES.find(p => p.id === activePropId);
  
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
      {!propertyId && (
      <div className="ps-selector-wrap" style={{ background: 'var(--ds-bg-dark)', borderBottom: '1px solid var(--ds-border)', paddingTop: 'var(--ds-space-10)', paddingBottom: 'var(--ds-space-10)' }}>
        <div className="wrap" style={{ padding: '0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          <h3 style={{ margin: 0, color: 'var(--accent-bright)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>Our New Launch</h3>
          
          <div style={{ display: 'flex', gap: '16px', padding: '0', flexWrap: 'wrap', justifyContent: 'center' }}>
            {VEL_PROPERTIES.map(p => (
              <button 
                key={p.id}
                onClick={() => setActivePropId(p.id)}
                className={`ps-prop-btn ${activePropId === p.id ? 'active' : ''}`}
                style={{
                  background: activePropId === p.id ? 'var(--ds-accent)' : 'rgba(255,255,255,0.1)',
                  color: activePropId === p.id ? 'var(--vhg-ink-950)' : 'var(--vhg-white)',
                  border: '1px solid',
                  borderColor: activePropId === p.id ? 'var(--ds-accent)' : 'rgba(255,255,255,0.2)',
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
      )}

      {/* Tab Bar */}
      <div className="ps-subnav">
        <div className="ps-subnav-inner">
          <a href="#details" className={activeTab === "details" ? "active" : ""} onClick={(e) => handleTabClick(e, "details")}>Property Details</a>
          <a href="#layout" className={activeTab === "layout" ? "active" : ""} onClick={(e) => handleTabClick(e, "layout")}>Layout</a>
          {activeProp.locationImg && <a href="#location" className={activeTab === "location" ? "active" : ""} onClick={(e) => handleTabClick(e, "location")}>Location</a>}
          {activeProp.status !== "Completed" && <a href="#amenities" className={activeTab === "amenities" ? "active" : ""} onClick={(e) => handleTabClick(e, "amenities")}>Amenities</a>}
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
          </div>

          {/* Right Details */}
          <div className="ps-details">
            <h2 className="ps-title">Property<br/>Details</h2>
            
            <div className="ps-stats-grid">
              <div className="ps-stat">
                <small>Project Status:</small>
                <p>{activeProp.status}</p>
              </div>
              {activeProp.status !== "Completed" && (
              <div className="ps-stat">
                <small>Location:</small>
                <p>{activeProp.location}</p>
              </div>
              )}
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
              {activeProp.status !== "Completed" && (
              <div className="ps-stat" style={{ gridColumn: 'span 2' }}>
                <small>Map Link:</small>
                <p>
                  <a href={activeProp.locLink} className="loc-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/></svg>
                    Locate the Project &rarr;
                  </a>
                </p>
              </div>
              )}
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

          <img src={activeProp.layoutImg} alt={`${activeProp.name} Layout`} style={{ width: '100%', borderRadius: 'var(--ds-radius-none)' }} />
        </div>
      )}

      {/* Location Section */}
      {activeProp.locationImg && (
        <div id="location-section" className="wrap" style={{ paddingTop: '80px', paddingBottom: '80px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center', color: 'var(--ink)' }}>Project Location</h2>
          <img src={activeProp.locationImg} alt={`${activeProp.name} Location`} style={{ width: '100%', borderRadius: 'var(--ds-radius-none)' }} />
        </div>
      )}

      {/* Amenities Section - Creative Layout */}
      {activeProp.status !== "Completed" && (
      <div id="amenities-section" style={{ background: 'var(--ink)', paddingTop: '100px', paddingBottom: '100px' }}>
        <style>{`
          .creative-amenity-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: var(--ds-radius-none);
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
                    borderRadius: 'var(--ds-radius-none)', 
                    display: 'block',
                    WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, black 50%, transparent 100%)'
                  }} 
                />
              ) : (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', width: '100%', aspectRatio: '16/9', borderRadius: 'var(--ds-radius-none)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Visual Coming Soon</div>
                </div>
              )}
            </div>
            
            {/* Right Details - Creative Amenities Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {(activeProp.name === "Golden City" ? GOLDEN_CITY_AMENITIES : AMENITIES_DATA).map((item, idx) => (
                <div key={idx} className="creative-amenity-card" style={{ justifyContent: 'center', textAlign: 'center' }}>
                  <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '15px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}

export { VEL_PROPERTIES, COMPLETED_PROPERTIES, ALL_PROPERTIES };
export default PropertyShowcase;
