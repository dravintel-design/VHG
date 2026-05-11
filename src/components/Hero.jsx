import React, { useState, useEffect, useRef } from 'react';
// Hero with text animation + slider + search bar

const SCENES = [
  { bg: "bg-scene-1", kicker: "Featured Layout", title: ["A", "Living", "Landscape"], location: "Vel Serenity · Oragadam" },
  { bg: "bg-scene-2", kicker: "New Launch", title: ["An", "Enduring", "Address"], location: "Vel Aranya · Hosur Belt" },
  { bg: "bg-scene-3", kicker: "Flagship", title: ["A", "Coastline", "of", "Prosperity"], location: "Vel Vistas · ECR Coastline" },
];

function AnimatedTitle({ title, keyBase }) {
  const delayOffset = 0.45;
  const fullText = title.join(" ");
  return (
    <h1 className="hero-title" aria-label={fullText}>
      {title.map((w, i) => (
        <span className="word" aria-hidden="true" key={keyBase + "-" + i}>
          <span style={{ animationDelay: `${delayOffset + i * 0.1}s` }}>{w}</span>
        </span>
      ))}
    </h1>
  );
}

function Hero() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
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
        <AnimatedTitle title={scene.title} keyBase={"t" + animKey} />
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


    </section>
  );
}

export default Hero;
