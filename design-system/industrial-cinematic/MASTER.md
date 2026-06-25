# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> **Source of truth:** This file is derived directly from `../../DESIGN.md`. Where the two
> ever disagree, `DESIGN.md` wins — this file exists to turn its prose into concrete tokens.

---

**Project:** Industrial Cinematic
**Generated:** 2026-06-25
**Category:** Luxury Industrial / Cinematic Product Launch
**Theme:** Dark-mode only. There is no light theme — the UI is designed to sit on top of a
near-black cinematic video at all times.

---

## Hero Asset

- **Video:** `assests/v-1.mp4` — the scroll-scrubbed cinematic centerpiece (crane, suspended
  deep-red shipping container, hook release).
- The video must never autoplay. Bind its `currentTime` to scroll position (e.g. GSAP
  ScrollTrigger `scrub`, or a manual `requestAnimationFrame` + `video.currentTime` setter)
  so playback only advances with user scroll, in both directions.
- Preload metadata only (`preload="metadata"`); poster frame should be the crane wide shot.
- Reserve the full viewport (`100dvh`) for the video container so there is zero layout shift
  while it loads.

## Global Rules

### Color Palette

Pulled directly from DESIGN.md's named palette — no generic accent substitutions (no gold,
no neon, no saturated blue).

| Role | Name | Hex | CSS Variable |
|------|------|-----|--------------|
| Background / Primary | Matte Black | `#0B0B0C` | `--color-background` |
| Surface | Charcoal | `#171716` | `--color-surface` |
| Surface Raised | Graphite | `#26262A` | `--color-surface-raised` |
| Border / Divider | Dark Steel | `#3A3D42` | `--color-border` |
| Accent / Primary CTA | Deep Crimson | `#9B1B22` | `--color-accent` |
| Accent Hover / Depth | Burgundy | `#5C1A1E` | `--color-accent-deep` |
| Foreground / Headlines | Soft White | `#F4F2EE` | `--color-foreground` |
| Secondary Text | Muted Silver | `#A8ACB2` | `--color-muted` |
| Destructive | (system, not brand) | `#DC2626` | `--color-destructive` |
| Ring / Focus | Soft White | `#F4F2EE` | `--color-ring` |

**Color Notes:** The Deep Crimson container is the *only* saturated color in the system — it
must read as rare and intentional. Never introduce a second accent hue. Glass surfaces use
Charcoal/Graphite at low opacity, never pure white panels.

### Typography

Editorial, bold, large-scale, minimal wording — matches the Apple / Linear / Vercel / Rivian /
Porsche reference set (geometric grotesk, not a luxury serif).

- **Heading Font:** Inter Tight (700–800, tight letter-spacing, often all-caps for hero
  statements like "ENGINEERED" / "FOR SCALE")
- **Body Font:** Inter (400–500)
- **Label / Stat Font:** JetBrains Mono (uppercase, tracking-wide) — for status pills, stats,
  scroll-indicator copy ("SCROLL TO CONTROL")
- **Google Fonts:** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap`

**Type Scale:**

| Token | Size | Usage |
|-------|------|-------|
| `--text-label` | 12px / tracking-widest / mono | Pills, status indicators, scroll hint |
| `--text-body` | 16px | Supporting copy (kept short, never paragraphs in hero) |
| `--text-sub` | 20px | Section intros |
| `--text-h2` | 40px | Section headlines |
| `--text-hero` | 72–96px (clamp to viewport) | Hero statements ("DELIVER", "WITHOUT LIMITS") |

H1:Body contrast ratio should stay roughly 5:1 — hero type is meant to dominate.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps (icon to label) |
| `--space-sm` | `8px` | Inline spacing |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Card padding |
| `--space-xl` | `32px` | Large gaps between cards |
| `--space-2xl` | `48px` | Section internal margins |
| `--space-3xl` | `96px` | Section-to-section spacing (generous whitespace is a design element) |

### Shadow / Elevation

Soft only — DESIGN.md explicitly forbids harsh shadows and thick borders.

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-glass` | `0 8px 32px rgba(0,0,0,0.35)` | Floating glass cards over video |
| `--shadow-button` | `0 4px 16px rgba(155,27,34,0.25)` | Primary crimson buttons only |
| `--shadow-nav` | `0 1px 0 rgba(255,255,255,0.06)` | Transparent nav hairline, not a shadow box |

---

## Component Specs

### Navigation

```css
.nav {
  position: fixed;
  top: 0;
  background: transparent;
  backdrop-filter: none; /* stays invisible until scroll if you add a scroll-state */
  padding: var(--space-lg) var(--space-2xl);
}

.nav-cta {
  background: var(--color-accent);
  color: var(--color-foreground);
  border-radius: 999px;
  padding: 10px 24px;
  font-weight: 600;
  transition: transform 200ms ease, opacity 200ms ease;
}
.nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }
```

No heavy nav bar background, no colored fills, minimal links only.

### Buttons

```css
/* Primary */
.btn-primary {
  background: var(--color-accent);
  color: var(--color-foreground);
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: var(--shadow-button);
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease;
  cursor: pointer;
}
.btn-primary:hover { transform: translateY(-1px); opacity: 0.92; }

/* Secondary — glassmorphism */
.btn-secondary {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--color-foreground);
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  transition: background 250ms ease;
  cursor: pointer;
}
.btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }
```

### Glass Cards

```css
.card-glass {
  background: rgba(23, 23, 22, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: var(--space-lg);
  box-shadow: var(--shadow-glass);
  transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms ease;
}
```

Never fill the screen with cards — one or two floating panels max per viewport, showing only
the most important stat or status.

### Status Pills

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 6px 14px;
}
```

### Scroll Indicator

Minimal mouse-shaped outline, centered bottom of hero, with an animated wheel translating
downward on a 1.5–2s loop. Label below in `--text-label` style: "SCROLL TO CONTROL". Fades out
(opacity, not layout) within the first ~5% of scroll progress and does not return.

---

## Motion Rules

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (slow-out) for entrances; never linear, never bounce.
- Durations: 200–350ms for UI micro-interactions; 400–600ms for section-level fades; the
  hero video itself is scroll-scrubbed, not time-based.
- Only animate `transform` and `opacity` — never `width`/`height`/`top`/`left`, to keep the
  experience smooth while the video is also consuming frame budget.
- Hero UI elements (headline, buttons, nav, scroll indicator) fade out via opacity as scroll
  progresses through the crane sequence — they should never abruptly disappear.
- Respect `prefers-reduced-motion`: keep the scroll-scrubbed video (it's user-driven, not
  autoplay) but disable floating/parallax embellishments on cards and nav.

## Page Pattern — Cinematic Scroll Narrative

This is a custom pattern, not a stock landing template. Section order follows the story in
`DESIGN.md`, not a generic SaaS structure:

1. **Hero (Scroll-Scrubbed Video)** — crane + suspended crimson container, camera moves tied
   to scroll, UI (nav, headline, CTA, scroll indicator) fades out as story progresses.
2. **Impact Transition** — hook releases, container falls, impact bleeds into the next
   section (e.g. a flash/crossfade, not a hard cut).
3. **Capability Sections** — large editorial statements + minimal glass stat panels, generous
   whitespace, asymmetrical layout (text left, visual breathing room right — mirrors the hero's
   left-text/right-container balance).
4. **Closing CTA** — restrained, same crimson primary button, no dense footer mega-menu.

**CTA Placement:** One primary action only per screen (consistent with DESIGN.md's "every
component should have a clear purpose").

---

## Anti-Patterns (Do NOT Use)

- ❌ Gold/amber accents, neon colors, saturated blues, playful palettes
- ❌ Light mode panels — no white/cream surfaces anywhere
- ❌ Liquid-glass chromatic aberration / iridescent effects — glass here is restrained and dark
- ❌ Mega menus, client-logo walls, "I am a..." path-selection patterns
- ❌ Stock photography or generic illustrations
- ❌ Harsh shadows, thick borders, screen-filling card grids
- ❌ Autoplaying the hero video, or any hero motion not driven by scroll
- ❌ Emojis as icons — use SVG icons (Heroicons/Lucide), consistent stroke weight
- ❌ Bouncy easing, abrupt cuts, excessive rotation
- ❌ Long paragraphs inside the hero — short, impactful statements only

---

## Pre-Delivery Checklist

- [ ] Hero video only advances via scroll, never autoplays, scrubs both directions smoothly
- [ ] No emojis used as icons (SVG only, consistent stroke weight)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover/transition timing 150–350ms, slow-out easing, no bounce
- [ ] Text contrast ≥4.5:1 against Matte Black / Charcoal surfaces
- [ ] Focus states visible for keyboard navigation (ring uses Soft White, not the crimson accent)
- [ ] `prefers-reduced-motion` respected (video stays scroll-driven; decorative motion disabled)
- [ ] Responsive at 375px, 768px, 1024px, 1440px — hero text never wraps awkwardly
- [ ] No horizontal scroll on mobile; hero text stays left-aligned with container visual right
- [ ] Only one accent hue (Deep Crimson) used anywhere in the UI
