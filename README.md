<div align="center">

# 💧 AQUOR — Africa's Water, Perfected

**The digital platform for one of Africa's largest bottled water & hydration companies.**

Premium animated website · E-commerce & ordering · Manufacturing showcase ·
Sustainability hub · Water Dredging Foundation · ESG portal · WhatsApp & Telegram bots

[Quick Start](docs/QUICK_START.md) · [Architecture](docs/ARCHITECTURE.md) ·
[Deployment](docs/DEPLOYMENT.md) · [Contributing](CONTRIBUTING.md) · [Roadmap](ROADMAP.md)

</div>

---

## What's in this repository

| Directory | Contents | Status |
|---|---|---|
| [`frontend/`](frontend/) | Next.js 14 premium animated website (TypeScript, Tailwind, Framer Motion) | ✅ **Working** |
| [`backend/`](backend/) | NestJS API platform — module architecture & integration spec | 📐 Spec |
| [`admin/`](admin/) | Admin dashboard — order, inventory, production & CSR management spec | 📐 Spec |
| [`database/`](database/) | PostgreSQL schema, seed data, ER diagram | ✅ Ready |
| [`whatsapp-bot/`](whatsapp-bot/) | WhatsApp Business API bot — conversation flows | 📐 Spec |
| [`telegram-bot/`](telegram-bot/) | Telegram bot — conversation flows | 📐 Spec |
| [`ai/`](ai/) | AI chatbot knowledge base & prompt architecture | 📐 Spec |
| [`mobile/`](mobile/) | iOS / Android native app design specification | 📐 Spec |
| [`infrastructure/`](infrastructure/) | Docker, Kubernetes, Terraform, Nginx | ✅ Ready |
| [`docs/`](docs/) | Architecture, API, deployment, testing, SEO/AEO, scalability | ✅ Ready |
| [`design-system/`](design-system/) | Design tokens, typography, motion language | ✅ Ready |

## The website

A cinematic, Apple-grade marketing and commerce experience:

- **Animated hero** — live canvas water simulation, parallax scroll, staged type reveals
- **Complete value chain** — source → purify → bottle → verify → deliver → renew, fully animated
- **Every product category** — sachet, PET (330ml–18.9L), dispenser, premium glass, customized bottles, specialty hydration
- **AQUOR Flow** — metered household & estate water supply: smart-meter dashboard, prepaid token vending, tiered tariffs
- **Digital factory** — SCADA-style live production dashboard, six-stage line walkthrough
- **Sustainability ecosystem** — circular plastic, water stewardship, community projects
- **Water Dredging Foundation** — CSR portal with animated impact dashboards (km dredged, boreholes, water-quality trends)
- **ESG portal** — KPIs, SDG mapping, report download center, certificate verification
- **Ordering** — WhatsApp & Telegram deep links, quotation forms, portal ecosystem
- **SEO / AEO / GEO** — JSON-LD (Organization, Product, NGO, FAQ), sitemap, robots, Open Graph, speakable-ready copy

## Quick start

```bash
git clone https://github.com/GAJETOso/Water.git
cd Water/frontend
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

Docker:

```bash
docker compose -f infrastructure/docker/docker-compose.yml up
```

## Tech stack

**Frontend** Next.js · React · TypeScript · Tailwind CSS · Framer Motion
**Backend (spec)** NestJS · PostgreSQL · Redis · REST + GraphQL
**Infra** Docker · Kubernetes · Terraform · Nginx · Cloudflare · Vercel/AWS
**Messaging** WhatsApp Business API · Telegram Bot API
**AI** Anthropic Claude · OpenAI · Google Gemini

## Documentation

- [Installation](docs/INSTALLATION.md) · [Quick Start](docs/QUICK_START.md) · [FAQ](docs/FAQ.md)
- [Architecture](docs/ARCHITECTURE.md) · [API](docs/API_DOCUMENTATION.md) · [Database](database/README.md)
- [Design System](design-system/README.md) · [Testing Strategy](docs/TESTING.md)
- [SEO / AEO / GEO](docs/SEO_AEO_GEO.md) · [Scalability](docs/SCALABILITY.md)
- [WhatsApp Bot Flows](whatsapp-bot/README.md) · [Telegram Bot Flows](telegram-bot/README.md)
- [Security Policy](SECURITY.md) · [Deployment](docs/DEPLOYMENT.md)

## Contributing

We welcome contributions — see [CONTRIBUTING.md](CONTRIBUTING.md) and our
[Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © AQUOR Beverages PLC

> AQUOR is a fictional brand created for this reference implementation.
