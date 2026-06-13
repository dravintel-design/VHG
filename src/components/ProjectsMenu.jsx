import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CURRENT_PROJECTS = [
  { name: "Golden City", to: "/projects/golden-city" },
  { name: "Global City", to: "/projects/global-city" },
  { name: "Mahalakshmi Nagar", to: "/projects/mahalakshmi-nagar" },
];

const COMPLETED_PROJECTS = [
  { name: "Sri Thanvanthiri Swamy Nagar", to: "/projects/sri-thanvanthiri-swamy-nagar" },
  { name: "Udhayam Farm Land", to: "/projects/udhayam-farm-land" },
  { name: "Om Ganapathy Nagar", to: "/projects/om-ganapathy-nagar" },
  { name: "JK Industrial", to: "/projects/jk-industrial" },
  { name: "Tamilvel Nagar", to: "/projects/tamilvel-nagar" },
  { name: "Selvavel Nagar", to: "/projects/selvavel-nagar" },
  { name: "JKR City", to: "/projects/jkr-city" },
  { name: "Sundaramurthi Vinayagar Nagar", to: "/projects/sundaramurthi-vinayagar-nagar" },
  { name: "JL Industry", to: "/projects/jl-industry" },
];

const UPCOMING_PROJECTS = [];

function ProjectsMenu({ open, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const half = Math.ceil(COMPLETED_PROJECTS.length / 2);
  const completedCols = [COMPLETED_PROJECTS.slice(0, half), COMPLETED_PROJECTS.slice(half)];

  return (
    <div className={`projects-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
      <button className="projects-menu-close" onClick={onClose} aria-label="Close projects menu">×</button>

      <div className="projects-menu-panels">
        {/* Current Projects */}
        <div className="projects-menu-panel light">
          <div className="projects-menu-heading">Current Projects</div>
          <ul className="projects-menu-list">
            {CURRENT_PROJECTS.map((p) => (
              <li key={p.name}>
                <Link to={p.to} onClick={onClose}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Projects */}
        <div className="projects-menu-panel tinted">
          <div className="projects-menu-heading">Completed Projects</div>
          <div className="projects-menu-columns">
            {completedCols.map((col, i) => (
              <ul className="projects-menu-list" key={i}>
                {col.map((p) => (
                  <li key={p.name}>
                    <Link to={p.to} onClick={onClose}>{p.name}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Upcoming Projects */}
        <div className="projects-menu-panel light">
          <div className="projects-menu-heading">Upcoming Projects</div>
          <ul className="projects-menu-list">
            {UPCOMING_PROJECTS.map((p) => (
              <li key={p.name}>
                <Link to={p.to} onClick={onClose}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProjectsMenu;
