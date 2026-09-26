# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **Corporate statements**: Vision, Mission and Brand Promise cards plus five
  signed policy statements (Quality, Food Safety, Environmental &
  Sustainability, HSE, Community Commitment) on the About page, sourced from
  `lib/data.ts`.

- **AQUOR Flow — metered household water supply**: `/water-supply` page with
  animated smart-meter gauge, connection journey, smart-metering features,
  tiered tariff table and estate/institution solutions; homepage teaser and
  nav/footer/sitemap wiring; `Service` JSON-LD and piped-water FAQ entry.
- Database: `water_schemes`, `water_connections`, `water_meters`,
  `meter_readings`, `water_tariffs`, `meter_vends`, `water_bills` (+ seed
  tariffs and schemes), all PG16-validated.
- API contracts for connections, tariffs, readings, prepaid token vending and
  postpaid bills; WhatsApp/Telegram token-vending bot flows.
- **My Meter portal demo** (`/water-supply/my-meter`): 14-day usage chart with
  hover tooltips and sr-only table, prepaid top-up history, leak/low-balance
  alert feed, portal capability grid; linked from the water-supply page,
  portals page and footer.

## [1.0.0] — 2026-07-10

### Added

- Premium animated Next.js website (`frontend/`): cinematic homepage, products,
  manufacturing digital factory, sustainability hub, Water Dredging Foundation
  with impact dashboards, ESG portal, industries, about, contact, portals and
  certifications pages.
- Design system: dark navy glassmorphism, Manrope + Playfair Display,
  Framer Motion motion language, canvas water simulation.
- SEO/AEO foundation: JSON-LD structured data, sitemap, robots, Open Graph,
  PWA manifest, security headers.
- PostgreSQL schema, seed data and ER documentation (`database/`).
- Infrastructure: Docker, docker-compose, Kubernetes manifests, Terraform
  skeleton, Nginx configuration (`infrastructure/`).
- CI/CD: GitHub Actions for lint, typecheck, build and Lighthouse.
- Bot conversation flows for WhatsApp Business API and Telegram.
- Full documentation set: architecture, API, deployment, testing, scalability,
  mobile app specification, AI knowledge base.
