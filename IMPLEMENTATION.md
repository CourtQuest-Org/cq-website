# CourtQuest Website — Implementation Spec

> A one-page, scroll-driven marketing site for CourtQuest. Futuristic, clean, and
> deliberately unconventional — built to introduce the world to the app, with the
> iOS release positioned as "coming soon."

---

## 1. Goals & Constraints

| Goal | Detail |
|---|---|
| **Format** | Single page, vertical scroll. Four full-height "scenes," not a stack of cards. |
| **Tone** | Futuristic, clean, polished. Must NOT read as a generic AI-generated template. |
| **Sections (in order)** | `Home` → `What CourtQuest Is` → `About Us` → `Contact` |
| **Signature interaction** | Logo `COURTQUEST` in the top-left, where the **Q is the map-pin** from the app logo. On scroll past the Home section it **collapses to `CQ`** (pin-Q retained). |
| **App status** | iOS app is **"coming soon"** — no App Store link yet. Beta web link (`courtquest.vercel.app`) may be surfaced as a secondary CTA. |
| **Contact** | Links only — no form, no backend. |

### What "not conventional" means here (design north star)
Avoid the default startup-template look: centered hero + three feature cards + footer.
Instead commit to **one strong idea** and carry it through every scene. Recommended
direction (pick and stay consistent):

- **"Locator HUD" theme** — the whole site behaves like a futuristic map/locator
  interface. Subtle grid lines, a faint radar/ping motif echoing the pin logo,
  monospaced accents for labels, kinetic typography. The crimson pin color
  (`#F0455F`) is the single accent against a near-black or off-white canvas.
- Asymmetric layouts, oversized type, generous negative space. Editorial, not boxy.
- Motion is purposeful (reveal-on-scroll, parallax depth) — never decorative noise.

---

## 2. Tech Stack

Building on the existing **React 19 + Vite** scaffold, adding animation/scroll libraries
to achieve the unconventional, motion-driven feel.

| Concern | Library | Why |
|---|---|---|
| Framework / bundler | React 19 + Vite 7 (existing) | Already scaffolded; fast HMR. |
| Smooth scroll | **Lenis** (`lenis`) | Inertial scroll is the backbone of the "scene" feel and drives scroll progress. |
| Animation | **Framer Motion** (`motion`) | Scroll-linked transforms, reveal-on-view, the logo collapse, layout animation. |
| Scroll progress | Framer Motion `useScroll` / `useTransform` | Single source of truth for the logo state and section transitions. |
| Icons | `lucide-react` | Clean, consistent line icons (replace emoji placeholders). |
| Fonts | `@fontsource` or self-hosted | One distinctive display face + one mono. See §6. |

Install:
```bash
npm i lenis motion lucide-react
```

> **Note on `motion`:** Framer Motion now ships as the `motion` package; import from
> `motion/react`. Verify current import paths against the docs at build time.

---

## 3. Architecture & File Layout

Keep the component-per-section structure already in the repo, restructured to the
four required scenes. Components map cleanly onto existing files where possible.

```
src/
├── main.jsx                      # mounts <App>, wraps in <SmoothScroll>
├── App.jsx                       # orders the four sections + <Navbar>
├── styles/
│   ├── tokens.css                # design tokens (colors, type scale, spacing) — NEW
│   └── global.css                # reset, base, scroll setup (replaces index.css/App.css)
├── lib/
│   └── useScrollProgress.js      # shared hook: 0→1 page progress + active section — NEW
├── components/
│   ├── SmoothScroll.jsx          # Lenis provider — NEW
│   ├── Navbar.jsx                # logo (COURTQUEST → CQ) + minimal nav — REWRITE
│   ├── Logo.jsx                  # animated wordmark with pin-Q — NEW
│   └── sections/
│       ├── HomeSection.jsx       # was HeroSection — "coming soon" + CTA
│       ├── AboutAppSection.jsx   # was FeaturesSection — what CourtQuest is
│       ├── AboutUsSection.jsx    # was TeamSection — the team
│       └── ContactSection.jsx    # was Footer/JoinQuest — links only
└── assets/
    ├── pin.svg                   # the pin extracted as standalone SVG — NEW (see §5)
    └── tenniscourt*.jpg/jpeg     # existing imagery (use sparingly / treated)
```

**Delete after migration:** `HeroSection.jsx`, `FeaturesSection.jsx`, `TeamSection.jsx`,
`JoinQuestSection.jsx`, `FAQSection.jsx`, `Footer.jsx` (content folds into the four
sections; FAQ is dropped unless requested).

---

## 4. The Logo Behavior (signature feature)

This is the centerpiece — get it right.

### Visual
- Full state: **`COURT[Q]UEST`** where the `Q` glyph is replaced by the SVG map-pin.
  The pin should sit on the typographic baseline and visually read as a Q (the pin's
  point/tail substitutes for the Q's tail). Tune size/offset so it reads as a word,
  not a logo glued to text.
- Collapsed state: **`[C][Q]`** — just `C` + pin-Q.

### Mechanics
- Driven by scroll progress, not a click. Use Framer Motion `useScroll` on the page.
- **Trigger:** when the user scrolls past the Home section (≈ `scrollY > viewportHeight * 0.6`),
  animate to the collapsed `CQ`. Scrolling back up restores `COURTQUEST`.
- Implementation approach: render the wordmark as individual letter spans. On collapse,
  animate the letters `OURT` and `UEST` out (width → 0, opacity → 0, slight blur/translate)
  using Framer Motion `AnimatePresence` + `layout`, leaving `C` and the pin-`Q`.
  `layout` animation handles the reflow smoothly so `C` and `Q` glide together.
- Add a subtle pin "ping" (radar pulse) on the collapse as a moment of delight —
  ties back to the locator theme. Keep it under 600ms, ease-out.
- Navbar background: transparent over Home; on collapse, fade in a frosted/blurred
  bar (`backdrop-filter: blur`) so the small logo stays legible over any section.

### Accessibility
- The clickable logo links to `#home` and carries `aria-label="CourtQuest — home"`.
- Respect `prefers-reduced-motion`: skip the letter animation, swap states instantly.

---

## 5. Extracting the Pin SVG

The app logo is a raster PNG. For crisp scaling + recoloring in the wordmark it should
become an **SVG**.

- Source: the background-removed mark in the iOS repo
  (`cq-swift-app/.../AppLogo.imageset/CQLogo-Light-1024x1024 Background Removed.png`),
  also present here as `public/cqlogo.png`.
- Trace to SVG (e.g. via a vector tool or `vtracer`/Illustrator image trace), clean up
  paths, and save as `src/assets/pin.svg` with `fill="currentColor"` so it inherits the
  crimson accent via CSS. Single-color is sufficient for the wordmark.
- Keep the original PNG for any place a full-detail mark is wanted (e.g. social meta image).

---

## 6. Design Tokens (`styles/tokens.css`)

Define once, use everywhere. Tune to taste, but commit to a restrained palette.

```css
:root {
  /* Color — single accent, high contrast */
  --cq-accent:      #F0455F;   /* the pin crimson */
  --cq-accent-dim:  #C9304A;
  --cq-ink:         #0B0C0E;   /* near-black canvas (dark-first) */
  --cq-surface:     #141518;
  --cq-paper:       #F4F4F2;   /* off-white for light scenes, if alternating */
  --cq-mute:        #8A8F98;   /* labels, secondary text */

  /* Type */
  --font-display: 'Space Grotesk', system-ui, sans-serif;  /* distinctive, modern */
  --font-mono:    'JetBrains Mono', ui-monospace, monospace; /* HUD labels */

  /* Scale (fluid) */
  --step-hero:  clamp(3rem, 9vw, 8rem);
  --step-h2:    clamp(2rem, 5vw, 4rem);

  /* Layout */
  --gutter: clamp(1.5rem, 5vw, 6rem);
  --ease:   cubic-bezier(0.16, 1, 0.3, 1);  /* the "expo-out" easing used throughout */
}
```

> Recommend **dark-first** (`--cq-ink` canvas) for the futuristic HUD read. Optionally
> alternate one section to `--cq-paper` for rhythm — but only if it reinforces, not
> distracts. Decide once and stay consistent.

---

## 7. Section Specs

Each section is a `min-height: 100vh` "scene" with a `section-label` (small mono caption,
e.g. `01 — LOCATE`) reinforcing the HUD theme.

### 7.1 Home — `HomeSection` (`#home`)
- **Purpose:** First impression + "iOS app coming soon."
- **Content:**
  - Oversized kinetic headline (e.g. *"Find your court. Start your quest."*).
  - A clear **"iOS app — Coming Soon"** badge/pill. No App Store button yet.
  - Primary CTA: notify/learn-more (anchor to Contact or the beta link
    `https://courtquest.vercel.app/` labeled "Try the beta").
  - Scroll cue ("scroll to explore ↓").
- **Motion:** subtle parallax on the headline; faint animated radar grid background
  echoing the pin. Headline letters reveal on load with staggered translate/blur.

### 7.2 What CourtQuest Is — `AboutAppSection` (`#about`)
- **Purpose:** Explain the product. Source content from the current `FeaturesSection`.
- **Content (rewrite the existing copy, keep the substance):**
  - One-line thesis: *CourtQuest finds the nearest, least-busy court for you in one tap.*
  - 2–3 feature beats (replace emoji with `lucide-react` icons):
    - **Find courts fast** — real-time availability near you, powered by live data.
    - **One button** — pick a sport, press once, get the best court by travel time + busyness.
    - **More sports coming** — tennis today, expanding soon.
  - Optional: a tasteful phone mockup / app screenshot frame (use treated imagery, not stock-looking).
- **Motion:** feature beats reveal on scroll-into-view, alternating left/right (asymmetric).

### 7.3 About Us — `AboutUsSection` (`#team`)
- **Purpose:** The team. Use the existing `TeamSection` roster verbatim.
- **Members (from current `TeamSection.jsx`):**
  - Aadhya Mittapalli — Founder & Executive Lead
  - Vedant Chaudhari — Technical Lead
  - Vihaan Kerekatte — Executive Developer
  - Keerthana Thirukonda — Social Media & Design
  - Jia Mathur — Marketing & Outreach
  - Vedanth Iyengar — Finance Manager
  - Keerthana Karthikeyan — Head Frontend Developer
  - Vihaan Kinra — Frontend Developer
- **Layout:** NOT a plain card grid. Recommended: an editorial roster — names as large
  type, role in mono caption, photo placeholder that reveals/tilts on hover. Could be a
  horizontal scroll strip or a staggered masonry to stay unconventional.
- **Photos:** `team-photo-placeholder` until real photos provided; keep the slot.

### 7.4 Contact — `ContactSection` (`#contact`)
- **Purpose:** Reach us. **Links only**, no form.
- **Links (from the app's About screen):**
  - Email — `enhanceyourquest@gmail.com`
  - Instagram — `@courtquest` → `https://www.instagram.com/courtquest/`
  - Support — `https://gofund.me/aef0dc55`
- **Content:** big closing statement (*"Elevate your play, enhance your quest."* — the
  app tagline), the links as oversized interactive list items (hover = accent fill +
  pin ping), and a minimal footer line (`CourtQuest © 2026`).
- **Motion:** link items animate on hover with the accent; final pin "lands" as you reach
  the bottom.

---

## 8. Smooth Scroll Setup (`SmoothScroll.jsx`)

- Initialize Lenis once at the app root, drive its `raf` loop, and bridge its scroll
  value into Framer Motion (so `useScroll` and the logo collapse read the same progress).
- Provide a small `data-section` IntersectionObserver (or Framer `useInView` per section)
  to track the active section for the section label and any nav state.
- Anchor links (`#home`, `#about`, `#team`, `#contact`) should use Lenis's
  `scrollTo` for inertial jumps, not native jump.

---

## 9. Responsive & Performance

- **Mobile:** scenes stack naturally; logo collapse still triggers on scroll. Reduce
  parallax intensity and background animation cost on small screens / low power.
- **Reduced motion:** gate all scroll-linked and entrance animations behind
  `prefers-reduced-motion`; provide static fallbacks.
- **Assets:** export the pin as SVG (tiny); compress any photographs; lazy-load
  below-the-fold imagery. Target a fast LCP on the Home headline.
- **SEO/meta:** set `<title>`, description, and an Open Graph image (use the full-detail
  PNG logo) in `index.html`. Single-page so no routing needed.

---

## 10. Build Order (suggested)

```
1. Tokens + global styles + fonts          → verify: canvas, type, accent render
2. SmoothScroll (Lenis) + page progress     → verify: inertial scroll, progress 0→1
3. Logo.jsx static (COURTQUEST w/ pin-Q)    → verify: pin reads as Q in the word
4. Logo collapse on scroll (→ CQ)           → verify: collapses past Home, restores up
5. HomeSection (coming soon + CTA)          → verify: headline, badge, scroll cue
6. AboutAppSection (what it is)             → verify: 3 beats reveal on scroll
7. AboutUsSection (team roster)             → verify: all 8 members, hover states
8. ContactSection (links only)             → verify: 3 links correct + reachable
9. Responsive + reduced-motion passes       → verify: mobile + a11y
10. Meta/OG + cleanup of old components      → verify: build clean, dead files removed
```

---

## 11. Open Items (confirm before / during build)

- **Display typeface:** Space Grotesk is the recommendation; swap if a stronger brand
  face is chosen. One display + one mono only.
- **Dark vs light:** spec is dark-first. Confirm before final visual polish.
- **Team photos:** placeholders until real images supplied.
- **Beta link:** confirm `courtquest.vercel.app` should be public-facing as "the beta,"
  or whether the iOS "coming soon" should stand alone with no live link.
