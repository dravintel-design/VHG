// Nav with mega-menu dropdowns
const { useState, useEffect, useRef } = React;

const MENUS = {
  About: {
    intro: {
      title: "About VHG",
      body: "Since 2011, Vel Homes Global has transformed plotted developments in Tamil Nadu — delivering RERA-approved layouts with world-class infrastructure and measurable appreciation.",
      links: [
        ["Our Story", "01"],
        ["Vision & Mission", "02"],
        ["Founder's Message", "03"],
        ["Core Values", "04"],
        ["Sustainability & Impact", "05"],
        ["Milestones", "06"],
      ]
    },
    cards: [
      { tag: "Est. 2011", title: "Our Legacy", text: "Fourteen years of plotted development across South India.", ph: "ph-a" },
      { tag: "Team", title: "The People", text: "Engineers, planners, and landscape architects.", ph: "ph-b" },
    ]
  },
  Properties: {
    intro: {
      title: "Our Projects",
      body: "Master-planned layouts, farm plots, and premium residential communities across Tamil Nadu's growth corridors.",
      links: [
        ["Residential Plots", "12"],
        ["Farm Plots", "08"],
        ["Gated Communities", "06"],
        ["Commercial Layouts", "03"],
        ["Completed Projects", "34"],
        ["Upcoming Launches", "05"],
      ]
    },
    cards: [
      { tag: "Featured", title: "Vel Serenity", text: "Gated community · Oragadam · from ₹42L", ph: "ph-c" },
      { tag: "New Launch", title: "Vel Aranya", text: "Farm plots · Hosur belt · from ₹18L", ph: "ph-d" },
    ]
  },
  "Partner Programs": {
    intro: {
      title: "Grow with VHG",
      body: "Seven distinct partner tracks — from landowners and channel partners to institutional investors and thematic collaborators.",
      links: [
        ["Land Alliance", "→"],
        ["Channel Partner Network", "→"],
        ["Investor Alliance", "→"],
        ["Global Investor Connect", "→"],
        ["VHG Referral Circle", "→"],
        ["Thematic Collaborations", "→"],
      ]
    },
    cards: [
      { tag: "For Landowners", title: "Land Alliance", text: "Convert your land into a premium VHG layout.", ph: "ph-e" },
      { tag: "For Investors", title: "Investor Circle", text: "Pre-launch access to every new release.", ph: "ph-f" },
    ]
  },
  Insights: {
    intro: {
      title: "Blogs & Insights",
      body: "Market analysis, investment guides, and reports on Tamil Nadu's evolving real-estate landscape.",
      links: [
        ["Market Reports", "24"],
        ["Investment Guides", "18"],
        ["Legal & RERA", "12"],
        ["Location Intelligence", "09"],
        ["Case Studies", "07"],
      ]
    },
    cards: [
      { tag: "Latest", title: "Q4 2025 Report", text: "Tamil Nadu plotted market outlook.", ph: "ph-a" },
      { tag: "Guide", title: "Buyer's Handbook", text: "Everything before your first plot.", ph: "ph-b" },
    ]
  },
  Contact: null,
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (k) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (MENUS[k]) setOpen(k);
    else setOpen(null);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  return (
    <nav className={`nav ${scrolled || open ? "scrolled" : ""}`} onMouseLeave={scheduleClose}>
      <div className="nav-inner">
        <a href="index.html" className="logo">
          <div className="logo-mark">V</div>
          <div className="logo-text">
            <b>Vel Homes</b>
            <small>GLOBAL · EST. 2011</small>
          </div>
        </a>

        <div className="nav-links">
          {Object.keys(MENUS).map((k) => (
            <a
              key={k}
              className={`nav-link ${open === k ? "open" : ""}`}
              onMouseEnter={() => openMenu(k)}
              href={
                k === "About" ? "about.html" :
                k === "Properties" ? "properties.html" :
                k === "Partner Programs" ? "partners.html" :
                k === "Insights" ? "insights.html" :
                k === "Contact" ? "contact.html" :
                `index.html#${k.toLowerCase()}`
              }
            >
              {k}
              {MENUS[k] && <span className="chev">▾</span>}
            </a>
          ))}
        </div>

        <div className="nav-cta">
          <a className="nav-btn ghost" href="partners.html">Be a Partner</a>
          <a className="nav-btn solid" href="contact.html">Get in Touch</a>
        </div>
      </div>

      {open && MENUS[open] && (
        <div className="mega" onMouseEnter={() => openMenu(open)}>
          <div className="mega-grid">
            <div className="mega-intro">
              <div className="eyebrow">— {open}</div>
              <h3>{MENUS[open].intro.title}</h3>
              <p>{MENUS[open].intro.body}</p>
              <ul>
                {MENUS[open].intro.links.map(([label, count]) => (
                  <li key={label}><a href="#"><span>{label}</span><span>{count}</span></a></li>
                ))}
              </ul>
            </div>
            {MENUS[open].cards.map((c, i) => (
              <div className="mega-card" key={i}>
                <div className={`mega-card-bg ${c.ph}`}></div>
                <div className="mega-card-content">
                  <div className="eyebrow">— {c.tag}</div>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

window.Nav = Nav;
