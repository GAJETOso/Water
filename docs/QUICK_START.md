# Quick Start

Five minutes from clone to a running premium water website.

```bash
git clone https://github.com/GAJETOso/Water.git
cd Water/frontend
npm install
npm run dev
```

Open **http://localhost:3000** — you should see the animated AQUOR homepage.

## What to explore

| URL | What it shows |
|---|---|
| `/` | Cinematic hero, value chain, products, foundation impact |
| `/products` | All six product families with per-category quoting |
| `/manufacturing` | Live (simulated) SCADA production dashboard |
| `/foundation` | Impact dashboard with animated charts |
| `/esg` | ESG KPIs, SDG mapping, report download center |
| `/contact` | WhatsApp / Telegram ordering entry points |

## Make your first change

1. Edit brand data in `frontend/src/lib/data.ts` (company name, stats, products).
2. Adjust the palette in `frontend/tailwind.config.ts`.
3. The page hot-reloads instantly.

## Next steps

- Read the [Architecture](ARCHITECTURE.md) to see where the backend plugs in.
- Load [database/schema.sql](../database/schema.sql) to explore the data model.
- See [DEPLOYMENT.md](DEPLOYMENT.md) to ship it.
