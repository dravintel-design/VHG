// Hero with text animation + slider + search bar
const { useState: useState$H, useEffect: useEffect$H } = React;

const SCENES = [
  { bg: "bg-scene-1", kicker: "Featured Layout", left: ["A", "Living"], right: ["of", "Landscape"], location: "Vel Serenity · Oragadam" },
  { bg: "bg-scene-2", kicker: "New Launch", left: ["An", "Enduring"], right: ["of", "Address"], location: "Vel Aranya · Hosur Belt" },
  { bg: "bg-scene-3", kicker: "Flagship", left: ["A", "Coastline"], right: ["of", "Prosperity"], location: "Vel Vistas · ECR Coastline" },
];

function AnimatedTitle({ left, right, keyBase }) {
  const delayOffset = 0.45;
  return (
    <h1 className="hero-title">
      <span className="title-left">
        {left.map((w, i) => (
          <span className="word" key={keyBase + "-L-" + i}>
            <span style={{ animationDelay: `${delayOffset + i * 0.1}s` }}>{w}</span>
          </span>
        ))}
      </span>
      <span className="title-spacer"></span>
      <span className="title-right">
        {right.map((w, i) => (
          <span className="word" key={keyBase + "-R-" + i}>
            <span style={{ animationDelay: `${delayOffset + (left.length + i) * 0.1}s` }}>{w}</span>
          </span>
        ))}
      </span>
    </h1>
  );
}

function Hero() {
  const [sceneIdx, setSceneIdx] = useState$H(0);
  const [animKey, setAnimKey] = useState$H(0);

  useEffect$H(() => {
    const t = setInterval(() => {
      setSceneIdx((s) => {
        const next = (s + 1) % SCENES.length;
        setAnimKey(k => k + 1);
        return next;
      });
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const scene = SCENES[sceneIdx];

  return (
    <section className="hero" id="home">
      {SCENES.map((s, i) => (
        <div
          key={i}
          className={`hero-bg ${s.bg} ${i === sceneIdx ? "active" : ""}`}
        />
      ))}

      <div className="hero-content">
        <div className="hero-eyebrow" key={"k" + animKey}>{scene.kicker} · Tamil Nadu</div>
        <AnimatedTitle left={scene.left} right={scene.right} keyBase={"t" + animKey} />
        <p className="hero-sub" key={"s" + animKey}>
          Fourteen years of RERA-approved plotted development across South India's fastest-growing corridors.
        </p>
      </div>

      <div className="hero-accent-pill" aria-hidden="true"></div>

      <div className="hero-slider">
        {SCENES.map((_, i) => (
          <div
            key={i}
            className={`hero-slider-tick ${i === sceneIdx ? "active" : ""}`}
            onClick={() => { setSceneIdx(i); setAnimKey(k => k + 1); }}
          />
        ))}
      </div>

      <div className="hero-meta">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none"><path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/></svg>
        <span key={"l" + animKey}>{scene.location}</span>
      </div>

      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-cue-line"></div>
      </div>

      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <div className="search-field">
          <label>Property Type</label>
          <select>
            <option>Any type</option>
            <option>Residential Plot</option>
            <option>Farm Plot</option>
            <option>Gated Community</option>
            <option>Commercial</option>
          </select>
        </div>
        <div className="search-field">
          <label>Location</label>
          <select>
            <option>Any location</option>
            <option>Oragadam</option>
            <option>Hosur Belt</option>
            <option>ECR Coastline</option>
            <option>Sriperumbudur</option>
            <option>Coimbatore</option>
          </select>
        </div>
        <div className="search-field">
          <label>Plot Size</label>
          <select>
            <option>Any size</option>
            <option>600 — 1,200 sq.ft</option>
            <option>1,200 — 2,400 sq.ft</option>
            <option>2,400 — 4,800 sq.ft</option>
            <option>4,800+ sq.ft</option>
          </select>
        </div>
        <div className="search-field">
          <label>Starting From</label>
          <select>
            <option>INR · Any</option>
            <option>₹ 15 L +</option>
            <option>₹ 25 L +</option>
            <option>₹ 50 L +</option>
            <option>₹ 1 Cr +</option>
          </select>
        </div>
        <button className="search-submit" type="submit">
          Search
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
        </button>
      </form>
    </section>
  );
}

window.Hero = Hero;
