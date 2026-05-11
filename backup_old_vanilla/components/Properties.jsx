const { useState: useStateP } = React;

const PROJECTS = [
  { id: 1, name: "Vel Serenity", loc: "Oragadam · Chennai", cat: "Gated", status: "Selling", price: "₹42L", area: "1,200–2,400", plots: "186", rera: "TN/02/B/0042/2024", ph: "ph-a", badge: "Featured" },
  { id: 2, name: "Vel Aranya", loc: "Hosur Belt · Krishnagiri", cat: "Farm", status: "New Launch", price: "₹18L", area: "2,400–6,000", plots: "92", rera: "TN/02/B/0048/2025", ph: "ph-b", badge: "New Launch" },
  { id: 3, name: "Vel Vistas", loc: "ECR Coastline · Kanchipuram", cat: "Premium", status: "Selling", price: "₹68L", area: "1,500–3,200", plots: "74", rera: "TN/02/B/0039/2024", ph: "ph-c", badge: "Coastal" },
  { id: 4, name: "Vel Pravaaha", loc: "Coimbatore West", cat: "Residential", status: "Selling", price: "₹36L", area: "1,000–2,000", plots: "240", rera: "TN/02/B/0044/2024", ph: "ph-d" },
  { id: 5, name: "Vel Anantam", loc: "Tiruvallur Belt", cat: "Gated", status: "Selling", price: "₹28L", area: "1,200–2,400", plots: "156", rera: "TN/02/B/0036/2023", ph: "ph-e" },
  { id: 6, name: "Vel Anbu", loc: "Sriperumbudur · Chennai", cat: "Residential", status: "Completed", price: "₹52L", area: "1,500–2,800", plots: "124", rera: "TN/02/B/0028/2022", ph: "ph-f" },
  { id: 7, name: "Vel Kaveri", loc: "Trichy", cat: "Farm", status: "New Launch", price: "₹22L", area: "3,000–8,000", plots: "68", rera: "TN/02/B/0049/2025", ph: "ph-a", badge: "New Launch" },
  { id: 8, name: "Vel Arasi", loc: "Madurai South", cat: "Residential", status: "Selling", price: "₹31L", area: "1,200–2,200", plots: "144", rera: "TN/02/B/0041/2024", ph: "ph-b" },
  { id: 9, name: "Vel Veedhi", loc: "Salem Highway", cat: "Commercial", status: "Selling", price: "₹78L", area: "2,000–5,000", plots: "32", rera: "TN/02/B/0045/2024", ph: "ph-c" },
];

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "Residential", label: "Residential" },
  { id: "Gated", label: "Gated Communities" },
  { id: "Farm", label: "Farm Plots" },
  { id: "Premium", label: "Premium" },
  { id: "Commercial", label: "Commercial" },
];
const STATUSES = [
  { id: "any", label: "Any Status" },
  { id: "New Launch", label: "New Launches" },
  { id: "Selling", label: "Now Selling" },
  { id: "Completed", label: "Completed" },
];

function PinIcon() { return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 11s4-3.5 4-7a4 4 0 10-8 0c0 3.5 4 7 4 7z" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="4.2" r="1.4" fill="currentColor"/></svg>; }

function PropertiesPage() {
  const [cat, setCat] = useStateP("all");
  const [status, setStatus] = useStateP("any");

  const filtered = PROJECTS.filter(p =>
    (cat === "all" || p.cat === cat) &&
    (status === "any" || p.status === status)
  );

  return (
    <React.Fragment>
      <Nav />

      <section className="page-hero" data-screen-label="01 Properties Hero">
        <div className="page-hero-inner">
          <div className="breadcrumb"><a href="index.html">Home</a><span>/</span><span>Properties</span></div>
          <div className="eyebrow" style={{color:"rgba(255,255,255,0.9)"}}>— 34 Completed · 9 Active</div>
          <h1>Land that <em>grows</em><br/>with your family.</h1>
          <p>Master-planned plotted developments across Tamil Nadu's fastest-growing corridors — RERA-approved, infrastructure-ready, and backed by VHG's 24-month warranty.</p>
        </div>
      </section>

      <div className="filter-bar">
        <div className="filter-bar-inner">
          {FILTERS.map(f => (
            <button key={f.id} className={`filter-chip ${cat === f.id ? "active" : ""}`} onClick={() => setCat(f.id)}>
              {f.label}
              {f.id !== "all" && <small>{PROJECTS.filter(p => p.cat === f.id).length}</small>}
            </button>
          ))}
          <div className="filter-spacer"></div>
          {STATUSES.map(s => (
            <button key={s.id} className={`filter-chip ${status === s.id ? "active" : ""}`} onClick={() => setStatus(s.id)}>{s.label}</button>
          ))}
          <div className="filter-result"><b>{filtered.length}</b> of {PROJECTS.length}</div>
        </div>
      </div>

      <section className="page-body" data-screen-label="02 Properties List">
        <div className="proj-list">
          {filtered.map(p => (
            <article className="proj-list-card" key={p.id}>
              <div className="proj-list-media">
                <div className={`ph ${p.ph}`}></div>
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
          {filtered.length === 0 && <div style={{gridColumn:"1/-1",textAlign:"center",padding:80,color:"var(--muted)"}}>No projects match these filters.</div>}
        </div>
      </section>

      <section className="cta-band" data-screen-label="03 Properties CTA">
        <div className="wrap">
          <div className="eyebrow" style={{color:"var(--accent-bright)"}}>— Plan a visit</div>
          <h2>Walk the layout.<br/><em>Decide on the land.</em></h2>
          <p>Free weekend site visits from Chennai, Coimbatore, Hosur and Bengaluru — transport both ways, no obligation.</p>
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

ReactDOM.createRoot(document.getElementById("page-app")).render(<PropertiesPage />);
