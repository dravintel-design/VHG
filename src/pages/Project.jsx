import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PropertyShowcase, { ALL_PROPERTIES } from '../components/PropertyShowcase';

const SLUG_TO_ID = {
  // Current projects
  "golden-city": 3,
  "global-city": 2,
  "mahalakshmi-nagar": 1,
  // Completed projects
  "sri-thanvanthiri-swamy-nagar": 4,
  "udhayam-farm-land": 5,
  "om-ganapathy-nagar": 6,
  "jk-industrial": 7,
  "tamilvel-nagar": 8,
  "selvavel-nagar": 9,
  "jkr-city": 10,
  "sundaramurthi-vinayagar-nagar": 11,
  "jl-industry": 12,
};

function ProjectPage() {
  const { slug } = useParams();
  const propId = SLUG_TO_ID[slug];
  const prop = ALL_PROPERTIES.find(p => p.id === propId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!prop) return <Navigate to="/properties" replace />;

  return (
    <React.Fragment>
      <Nav />

      <section className="page-hero" data-screen-label="01 Project Hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/properties">Projects</Link><span>/</span><span>{prop.name}</span></div>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.9)" }}>{prop.status === "Completed" ? prop.status : `${prop.status} · ${prop.location}`}</div>
          <h1>{prop.name}</h1>
          <p>{prop.area} master-planned plotted development{prop.status === "Completed" ? "" : ` at ${prop.location}`} — {prop.availablePlots === "0" ? `all ${prop.totalPlots} plots sold out` : `${prop.availablePlots} of ${prop.totalPlots} plots available`}.</p>
        </div>
      </section>

      <PropertyShowcase propertyId={prop.id} />

      <Footer />
    </React.Fragment>
  );
}

export default ProjectPage;
