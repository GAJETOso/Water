# CLAUDE.md — AI agent guide for this repository

## What this is

Digital platform for AQUOR, a (fictional) premium African bottled water
company. The **implemented product is `frontend/`** — a fully static,
animated Next.js 14 site. Everything else (backend, bots, admin, mobile) is
**specification** that Phase 2+ implements; treat those docs as binding
contracts, not suggestions.

## Commands (run inside `frontend/`)

```bash
npm run dev         # dev server
npm run build       # production build — must pass before any commit
npm run lint        # eslint (next/core-web-vitals)
npm run typecheck   # tsc --noEmit (strict)
```

Database checks: `database/schema.sql` + `seed.sql` must apply cleanly to
PostgreSQL 16 (`-v ON_ERROR_STOP=1`); CI enforces this.

## Architecture facts you need

- All routes are **statically prerendered**; keep them that way — no
  server-side data fetching in marketing pages.
- Server components by default; `"use client"` only for interactive islands
  (nav, hero, counters, charts, dashboard, marquee).
- All editorial content lives in `frontend/src/lib/data.ts` — edit copy/stats
  there, not inside components.
- Design tokens: `frontend/tailwind.config.ts` + utilities in
  `src/app/globals.css` (`.glass`, `.section`, `.btn-primary`…). Follow
  `design-system/README.md` (color-usage rules are strict: gold = premium
  only, emerald = sustainability only).
- Every animation must respect `prefers-reduced-motion` (globals.css handles
  CSS; JS effects must check the media query — see `WaterCanvas.tsx`).
- SEO surface: per-route `metadata`, JSON-LD blocks, `sitemap.ts`, `robots.ts`.
  New routes must be added to sitemap + navbar/footer.

## Conventions

- Conventional Commits; branches `feature/*`, `fix/*`, `hotfix/*`.
- TypeScript strict, no `any` without justification.
- Charts follow the mark specs in `design-system/README.md` (one axis, thin
  marks, sr-only table fallback).
- Never commit secrets; env vars documented in `.env.example`.
