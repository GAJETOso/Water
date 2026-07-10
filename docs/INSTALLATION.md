# Installation

## Prerequisites

- Node.js ≥ 20 (LTS) and npm ≥ 10
- Git
- Optional: Docker ≥ 24 (for containerised runs), PostgreSQL 16 + Redis 7 (for backend work)

## 1. Clone

```bash
git clone https://github.com/GAJETOso/Water.git
cd Water
```

## 2. Frontend

```bash
cd frontend
npm install
cp ../.env.example .env.local   # optional — the site runs without env vars
npm run dev                     # http://localhost:3000
```

Useful scripts:

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (SSG) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | TypeScript strict check |

## 3. Database (optional, for backend development)

```bash
createdb aquor
psql aquor < database/schema.sql
psql aquor < database/seed.sql
```

## 4. Docker (full stack)

```bash
docker compose -f infrastructure/docker/docker-compose.yml up --build
```

Services: `web` (Next.js, :3000), `postgres` (:5432), `redis` (:6379).

## Troubleshooting

- **Fonts fail to download during build** — the build fetches Google Fonts once;
  behind a proxy set `HTTPS_PROXY` or vendor the fonts into `frontend/src/fonts`.
- **Port already in use** — `npm run dev -- -p 3001`.
- **Type errors after pulling** — `rm -rf frontend/.next && npm run typecheck`.
