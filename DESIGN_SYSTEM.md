# Vel Homes Global — Design System v1.0

*Land. Legacy. Life.*

Source of truth: [`src/design-system.css`](src/design-system.css). It is imported first in `src/main.jsx`; the legacy variables in `src/styles.css` are aliased onto these tokens, so always use `--ds-*` / `--vhg-*` tokens in new code.

---

## 1. Brand Palette

Derived from the four brand swatches (Colours 01–04):

| Swatch | Token | Hex | Role |
|---|---|---|---|
| Colour 01 — White | `--vhg-white` | `#ffffff` | Surfaces, text on dark |
| Colour 02 — Cream | `--vhg-cream` | `#f6ead3` | Warm secondary background |
| Colour 03 — Gold | `--vhg-gold` | `#d4a017` | Accent, CTAs, highlights |
| Colour 04 — Black | `--vhg-black` | `#000000` | Dark sections, primary text |

### Extended scales

**Gold** (`--vhg-gold-50` → `--vhg-gold-900`): tints and shades of `#d4a017`.
- `500` is brand gold — use for buttons, rules, and accents on light or dark surfaces.
- `600` (`#b38711`) is the hover state.
- `700` (`#8f6c0d`) is the minimum shade for gold *text* on white/cream (WCAG AA at body sizes).
- `200` (`#f2d06a`) is "bright gold" for accents on black.

**Cream** (`--vhg-cream-50` → `--vhg-cream-400`):
- `50` (`#fdfaf5`) is the default page background.
- `200` is the brand cream, used for alternate sections and cards.

**Ink** (`--vhg-ink-100` → `--vhg-ink-950`): the neutral ramp. `900` (`#0a0a0a`) is primary text; pure black `950` is reserved for full-bleed dark sections.

### Semantic tokens (use these first)

| Token | Resolves to | Use |
|---|---|---|
| `--ds-bg` | cream-50 | Page background |
| `--ds-bg-alt` | cream-200 | Alternate/warm sections |
| `--ds-bg-dark` | black | Dark sections, footer |
| `--ds-surface` | white | Cards, panels |
| `--ds-text` / `--ds-text-secondary` / `--ds-text-muted` | ink 900/500/400 | Copy hierarchy |
| `--ds-accent` / `--ds-accent-hover` / `--ds-accent-bright` | gold 500/600/200 | Interactive gold |
| `--ds-accent-text` | gold-700 | Gold as text on light backgrounds |
| `--ds-border` | ink-200 | Hairlines, card borders |
| `--ds-focus-ring` | gold-500 | `:focus-visible` outlines |

### Color rules

1. Gold is an accent, not a fill — never use gold-500 for large background areas; use cream for warmth instead.
2. Text on gold-500 is always black (`--vhg-ink-950`), never white.
3. Gold text on white/cream must be gold-700 or darker.
4. Dark sections use pure black with `--vhg-on-dark-2/3` for secondary/tertiary copy and gold-200 for accents.

---

## 2. Typography — Onest Variable

One typeface for everything: **Onest** (variable, weight axis 100–900), loaded from Google Fonts in `index.html`. Hierarchy comes from size and weight, not from mixing families.

| Token | Size | Weight | Use |
|---|---|---|---|
| `--ds-text-display-xl` | clamp(56–110px) | 300–400 | Hero statements, big numerals |
| `--ds-text-display` | clamp(40–76px) | 400 | Section heroes |
| `--ds-text-h1` | clamp(36–66px) | 400–500 | Page titles |
| `--ds-text-h2` | clamp(28–52px) | 500 | Section headings |
| `--ds-text-h3` / `h4` / `h5` | 32 / 24 / 20px | 500–600 | Card and block headings |
| `--ds-text-body-lg` / `body` / `body-sm` | 18 / 16 / 14px | 400 | Copy |
| `--ds-text-caption` | 12px | 400–500 | Meta, captions |
| `--ds-text-overline` | 11px | 600, uppercase, `0.2em` tracking | Kickers, labels |

Line heights: `--ds-leading-tight` (1.1) for display, `snug` (1.3) for headings, `normal` (1.6) for body. Display sizes take `--ds-tracking-tight` (−0.02em); the wordmark uses `--ds-tracking-brand` (0.3em).

---

## 3. Spacing & Layout

4px base scale: `--ds-space-1` (4px) through `--ds-space-32` (128px). Section padding is typically `--ds-space-20`–`--ds-space-32`; card padding `--ds-space-6`–`--ds-space-8`.

Container: `--ds-container-max` 1320px with `--ds-container-pad` 60px gutters (the existing `.wrap`). Fixed nav height: `--ds-nav-height` 84px.

---

## 4. Shape, Elevation, Motion

- **Radius:** VHG is sharp-edged — default `--ds-radius-none` (0). `--ds-radius-sm/md` only for small controls; `--ds-radius-pill` for chips.
- **Shadows:** `--ds-shadow-sm/md/lg` (warm-black based) and `--ds-shadow-gold` for highlighted CTAs.
- **Motion:** `--ds-ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), durations 150/300/600ms. Hover transitions use `base`; reveals use `slow`.
- **Z-index:** nav 100, overlay 200, modal 300, toast 400.

---

## 5. Component Primitives

Defined in `design-system.css`, ready to use in JSX:

- **Buttons** — `.ds-btn` plus a variant: `--primary` (gold fill, black text), `--dark` (black fill), `--outline`, `--ghost-light` (for dark/photo backgrounds). Uppercase, wide-tracked, square-cornered.
- **Overline** — `.ds-overline` (`--on-dark` variant) for section kickers.
- **Badge** — `.ds-badge` with `--gold` and `--dark` variants.
- **Card** — `.ds-card` with `--cream` and `--dark` variants.
- **Divider** — `.ds-divider`; `.ds-divider--gold` is the short 64px gold rule under headings.

---

## 6. Accessibility

- Body text is ink-900 on cream-50/white — ~19:1 contrast.
- Gold-500 on black and black on gold-500 both pass AA for normal text.
- Never set white text on gold, or gold-500 text on white at body sizes.
- Focus rings: 2px `--ds-focus-ring` with 3px offset (already global in `styles.css`).
