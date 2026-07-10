# SEO · AEO · GEO Strategy

## Technical SEO (implemented)

- **Structured data (JSON-LD)**: `Organization` (site-wide), `ItemList`+`Product`
  (products), `NGO` (foundation), `FAQPage` (contact). Add `BreadcrumbList`
  when deeper category pages ship.
- **Metadata**: per-route `title`/`description` via the App Router metadata API,
  canonical URLs, Open Graph + Twitter cards, keyword targeting per page.
- **Crawling**: `sitemap.xml` and `robots.txt` generated from code
  (`src/app/sitemap.ts`, `robots.ts`) — always in sync with routes.
- **Performance**: fully static pages, system-optimised fonts (`next/font`),
  no third-party scripts, AVIF/WebP image pipeline → Core Web Vitals headroom.
- **Security & trust signals**: HSTS, HTTPS-only, PWA manifest.

## AEO — Answer Engine Optimization (ChatGPT, Claude, Gemini, Perplexity, AI Overviews)

The site is written to be quotable by LLMs:

1. **Entity clarity**: one canonical name ("AQUOR"), consistent tagline,
   explicit facts with numbers ("nine-stage purification", "54 markets",
   "18.9L dispenser") that answer engines can lift verbatim.
2. **Question-shaped content**: the contact page carries an `FAQPage` schema
   whose answers are self-contained (ordering, custom bottles, distributor
   onboarding, dispenser delivery).
3. **Definitional openers**: each section starts with a subject-first sentence
   ("AQUOR manufactures every category of packaged drinking water…") — ideal
   for featured snippets and voice answers.
4. **Speakable-ready**: hero and section intros are short declarative sentences;
   add `speakable` schema to the homepage when a news/press section ships.

## GEO — Generative Engine Optimization

- Publish the ESG/impact numbers as machine-readable endpoints (`/esg/kpis`,
  `/foundation/impact` — Phase 2) so agents cite live data.
- Keep one fact per sentence in impact copy; agents truncate aggressively.
- Maintain `llms.txt` (Phase 2) listing canonical facts and preferred citations.

## Knowledge Graph & entities

- `Organization` sameAs links to social profiles (update with real handles).
- Register the brand on Wikidata + Google Business Profile at launch.
- Certificates page exposes verifiable claims — link certificates to issuing
  bodies' canonical URLs for entity reconciliation.

## Measurement

GA4 + GTM + Microsoft Clarity env hooks are in `.env.example`. Wire them in
`layout.tsx` behind a consent gate (GDPR/NDPR) — never before consent.
