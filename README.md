# Industrial Motion

A scroll-driven, cinematic landing page for a logistics/industrial brand. The hero pins on scroll and scrubs a background video frame-by-frame, with copy, CTAs, and a scroll indicator fading in sync with scroll progress.

## Tech Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [GSAP](https://gsap.com/) (`ScrollTrigger`) for the scroll-scrubbed video and reveal animations
- CSS Modules for styling, with a shared design-token layer (`src/styles/tokens.css`)

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview the production build locally
```

## Project Structure

```
public/video/        Background video served at runtime
src/
  components/         Reusable UI (Button, Pill, GlassCard, Nav, Reveal)
  sections/           Page sections (Hero, Capabilities, ClosingCta)
  hooks/              useScrollScrubVideo, useRevealOnScroll
  lib/scrollVideo/    Scroll-to-video-frame controller + UI fader
  state/              Lightweight shared hero scroll state
  styles/             Design tokens and global styles
design-system/        Design reference docs for the visual system
```

## Key Implementation Notes

- **Hero scroll-scrub** (`src/sections/Hero.jsx`, `src/hooks/useScrollScrubVideo.js`): the hero section is pinned with GSAP `ScrollTrigger` and maps scroll progress directly onto the video's `currentTime` — no canvas or frame extraction, just native video decoding.
- **UI fade** (`src/lib/scrollVideo/createHeroUiFader.js`): copy, the scroll indicator, and an accent flash fade in/out as scroll progress advances, driven by `gsap.quickSetter` for low-overhead per-frame updates.
- **Typography**: the hero headline and supporting copy use an editorial type scale (`src/sections/Hero.module.css`) — varied weights per line for visual rhythm, generous spacing, and soft ambient text shadows for legibility over video rather than hard drop shadows.

## Assets

The source video lives in `assests/` (backup + working copy); the version actually served to the app is in `public/video/`.
