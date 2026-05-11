import React, { useState, useEffect, useRef } from 'react';
// Tweaks panel — edit-mode protocol
const { useState: useState$T, useEffect: useEffect$T } = React;

function Tweaks() {
  const initial = (window.__TWEAKS) || {};
  const [t, setT] = useState$T(initial);
  const [active, setActive] = useState$T(false);

  useEffect$T(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setActive(true);
      if (e.data.type === "__deactivate_edit_mode") setActive(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Apply accent live
  useEffect$T(() => {
    document.documentElement.style.setProperty("--accent", t.accent || "#e8b84a");
    document.documentElement.style.setProperty("--sea", t.sea || "#3d6480");
    if (t.displayFont) {
      document.documentElement.style.setProperty("--display", `"${t.displayFont}", Georgia, serif`);
    }
    window.__TWEAKS = t;
    // Hide/show search bar
    const sb = document.querySelector(".search-bar");
    if (sb) sb.style.display = t.showSearchBar === false ? "none" : "";
  }, [t]);

  const update = (key, val) => {
    const next = { ...t, [key]: val };
    setT(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*");
  };

  if (!active) return null;

  return (
    <div className="tweaks">
      <h4>Tweaks</h4>

      <label>Accent color</label>
      <input type="color" value={t.accent} onChange={(e) => update("accent", e.target.value)} />

      <label>Display font</label>
      <select value={t.displayFont} onChange={(e) => update("displayFont", e.target.value)}>
        <option>Cormorant Garamond</option>
        <option>Playfair Display</option>
        <option>DM Serif Display</option>
        <option>Fraunces</option>
      </select>

      <label>Zoom intensity: {(t.zoomIntensity || 1.15).toFixed(2)}×</label>
      <input type="range" min="1" max="1.4" step="0.02" value={t.zoomIntensity || 1.15} onChange={(e) => update("zoomIntensity", parseFloat(e.target.value))} />

      <label className="check">
        <input type="checkbox" checked={t.showSearchBar !== false} onChange={(e) => update("showSearchBar", e.target.checked)} />
        Show search bar overlay
      </label>
    </div>
  );
}

window.Tweaks = Tweaks;

export default Tweaks;
