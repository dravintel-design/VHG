import React, { useState, useEffect } from 'react';
// Tweaks panel edit-mode protocol

function Tweaks() {
  const initial = (window.__TWEAKS) || {};
  const [t, setT] = useState(initial);
  const [active, setActive] = useState(false);

  useEffect(() => {
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
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent || "#d4a017");
    document.documentElement.style.setProperty("--sea", t.sea || "#d4a017");
    if (t.displayFont) {
      document.documentElement.style.setProperty("--display", `"${t.displayFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`);
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
        <option>Onest</option>
        <option>Proxima Nova</option>
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

export default Tweaks;
