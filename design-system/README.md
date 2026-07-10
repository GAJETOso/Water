# AQUOR Design System

The visual language behind the site — implemented as Tailwind tokens in
`frontend/tailwind.config.ts` and utilities in `frontend/src/app/globals.css`.

## Brand

- **Name**: AQUOR — always uppercase, letterspaced (`tracking-[0.25em]`).
- **Tagline**: "Africa's Water, Perfected."
- **Logo**: gradient water drop (aqua → deep ocean), `frontend/public/icon.svg`.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#040B16` | Page background |
| `navy-900` | `#071426` | Footer, panels |
| `navy-800` | `#0A1F3C` | Elevated surfaces |
| `ocean-600` | `#0E4D92` | Deep water gradient stop |
| `ocean-500` | `#1B6BC0` | Primary button gradient start |
| `aqua-400` | `#38BDF8` | Accents, links, focus |
| `aqua-300` | `#67E8F9` | Highlights, glows |
| `gold-500/400` | `#C9A96A` / `#DBC08A` | Premium/luxury accents only |
| `silver` | `#C7D2DD` | Secondary text on dark |
| `emerald-300/400` | Tailwind | Sustainability & Foundation only |

Rules: gold appears **only** on premium/certification surfaces; emerald **only**
on sustainability/impact surfaces; text always uses slate/white ink tokens,
never raw accent colors for paragraphs.

## Typography

- **Display**: Playfair Display — headlines, stat numerals. Weights 400–500.
- **Sans**: Manrope — body, UI, navigation. Weights 400–800.
- Scale: hero `text-5xl→7xl`, section `text-4xl→5xl`, card `text-xl→2xl`,
  body `text-sm→lg`, eyebrow `text-xs uppercase tracking-[0.3em]`.

## Surfaces — glassmorphism

`.glass` = `border-white/10 + bg-white/[0.04] + backdrop-blur-xl`.
`.glass-hover` adds aqua border, brighter fill and a soft cyan glow on hover.
Radii: cards `rounded-2xl/3xl`, pills `rounded-full`.

## Motion language

| Pattern | Spec |
|---|---|
| Reveal on scroll | opacity 0→1, y 32→0, 0.8s, ease `[0.22,1,0.36,1]`, once |
| Stagger | 0.08–0.12s per sibling |
| Hero type | staged lines, 0.2s apart |
| Parallax | `useScroll` + `useTransform`, subtle (≤120px) |
| Counters | 2s ease-out count-up on first view |
| Float | 8s ease-in-out ±16px (hero bottle) |
| Marquee | linear infinite, duplicated content, edge fade masks |

**Every animation must respect `prefers-reduced-motion`** — globals.css kills
transitions/animations globally, and canvas/JS effects check the media query.

## Components

`Reveal` (scroll reveal wrapper) · `Counter` (animated numerals) ·
`SectionHeading` (eyebrow/title/description) · `Marquee` · `Bottle` (SVG
product render, accent-parameterised) · `WaterCanvas` (hero simulation) ·
`Navbar` / `Footer` · `LiveDashboard` · `ImpactChart`.

## Accessibility

WCAG 2.2 AA: 4.5:1 body contrast on navy, visible focus, semantic landmarks,
labelled controls, sr-only data tables behind charts, no color-alone meaning.

## Data visualization

Thin marks, 4px rounded bar ends, 2px lines, recessive white/6% grid, direct
labels on final points, hover tooltips with full-column hit targets, one axis
per chart (never dual-axis), sr-only table fallback. Chart colors: emerald
(`#10B981`) and aqua (`#38BDF8`) — CVD-checked against `navy-900`.
