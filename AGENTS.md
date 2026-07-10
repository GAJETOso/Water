# AGENTS.md

Guidance for AI coding agents (Cursor, Copilot, Windsurf, Claude Code, etc.)
working in this repository. The canonical, detailed version is
[CLAUDE.md](CLAUDE.md) — read it first. Summary:

- **Working code lives in `frontend/`** (Next.js 14, TypeScript strict,
  Tailwind, Framer Motion). Backend/bots/admin/mobile are specs under their
  own directories — implement against those contracts, don't invent new ones.
- **Verify before you finish**: `npm run lint && npm run typecheck && npm run build`
  inside `frontend/` must pass. Schema changes must apply cleanly to
  PostgreSQL 16.
- **Editorial content** → `frontend/src/lib/data.ts`. **Design tokens** →
  `frontend/tailwind.config.ts`. Follow `design-system/README.md` color rules.
- **Keep routes static**; respect `prefers-reduced-motion`; add new routes to
  the sitemap, navbar and footer.
- Conventional Commits; no secrets in the repo (see `.env.example`).
