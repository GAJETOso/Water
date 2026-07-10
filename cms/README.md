# CMS (Phase 2)

Headless CMS (Payload, Strapi or Sanity — decision at Phase 2 kickoff) feeding
editorial surfaces the marketing team must own without deploys:

| Collection | Feeds |
|---|---|
| Press releases & news | Media/press center |
| ESG & annual reports (PDF + metadata + sha256) | ESG download center (`esg_reports` table) |
| Foundation project stories & photos | Foundation portal |
| Knowledge center articles / FAQ | Help center + AI knowledge base sync |
| Promotions & banners | Homepage, bots, app |
| Job postings | Career portal |
| Legal pages (privacy, terms) | Footer routes |

Requirements: draft/publish workflow with approvals, scheduled publishing,
localization (EN/FR + Nigerian languages), image pipeline to S3/CDN, webhook
→ ISR revalidation of affected routes, role-based editorial access, audit trail.
