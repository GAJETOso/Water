# FAQ

## Project

**Is AQUOR a real company?**
No — it is a fictional premium brand created for this reference implementation.
Swap `frontend/src/lib/data.ts` and the design tokens to rebrand it.

**Why is only the frontend implemented in code?**
The frontend is the deliverable users see; the backend, bots and portals are
fully specified (architecture, API contracts, database schema, conversation
flows) so Phase 2 implementation is unambiguous. See [ROADMAP.md](../ROADMAP.md).

**Where does the "live" manufacturing data come from?**
It is simulated client-side for demonstration. The SCADA/IoT integration point
is documented in [ARCHITECTURE.md](ARCHITECTURE.md).

## Development

**How do I change the brand name, stats or products?**
Everything editorial lives in `frontend/src/lib/data.ts`. Colors and fonts live
in `frontend/tailwind.config.ts` and `frontend/src/app/layout.tsx`.

**How do I add a page?**
Create `frontend/src/app/<route>/page.tsx`, export `metadata`, compose the
shared components (`SectionHeading`, `Reveal`, `Counter`), and add the route to
`src/app/sitemap.ts` and the navbar/footer.

**Do animations respect accessibility?**
Yes — `prefers-reduced-motion` disables the canvas simulation and CSS/Framer
transitions globally (see `globals.css` and `WaterCanvas.tsx`).

**Why Next.js static output instead of SSR?**
All marketing content is deterministic, so SSG gives edge-cacheable pages,
perfect Lighthouse scores and zero server cost. Dynamic surfaces (commerce,
portals) arrive with the backend in Phase 2.

## Operations

**How are secrets handled?**
Never committed. `.env.example` documents every variable; CI and K8s use
secret stores (GitHub Encrypted Secrets / K8s Secrets / cloud secret managers).

**What's the browser support?**
Evergreen browsers (last 2 versions). The canvas hero degrades gracefully.
