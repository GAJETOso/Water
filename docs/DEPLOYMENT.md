# Deployment

## Environments

| Env | Branch/Tag | URL pattern | Purpose |
|---|---|---|---|
| Local | any | localhost | Development |
| Staging | `main` | staging.aquor.com | Auto-deploy on merge |
| UAT | release candidate tag | uat.aquor.com | Business sign-off |
| Production | `v*` tag | www.aquor.com | Customers |

## Option A — Vercel (fastest)

```bash
cd frontend
npx vercel --prod
```

Set the project root to `frontend/`. All routes are static, so pages are served
from the edge CDN automatically. Add env vars from `.env.example` in the Vercel
dashboard as features come online.

## Option B — Docker + any host

```bash
docker build -f infrastructure/docker/Dockerfile.frontend -t aquor-web .
docker run -p 3000:3000 aquor-web
```

The image uses Next.js `standalone` output — ~150 MB, non-root user, ready for
ECS/Cloud Run/Fly/K8s.

## Option C — Kubernetes

```bash
kubectl apply -f infrastructure/k8s/
```

Manifests include Deployment (3 replicas), Service, Ingress (TLS via
cert-manager), HPA (CPU 70%, 3–12 pods), ConfigMap and secret placeholders.
Put Cloudflare in front for WAF/DDoS/CDN (`infrastructure/README.md`).

## CI/CD pipeline

GitHub Actions (`.github/workflows/`):

1. **ci.yml** — on every PR/push: install → lint → typecheck → build → upload artifact.
2. **lighthouse.yml** — on PRs: builds, serves, runs Lighthouse; reports scores
   (non-blocking, informational).

Release flow: merge to `main` (staging auto-deploy) → tag `vX.Y.Z` →
production deploy job (add your provider's deploy step where marked `TODO`).

Hotfix flow: branch `hotfix/*` from the production tag → PR → tag patch release.

## Rollback

- Vercel: promote a previous deployment.
- K8s: `kubectl rollout undo deployment/aquor-web`.
- Images are tagged with the git SHA — redeploy any prior SHA.

## Post-deploy checklist

- [ ] `curl -I` shows HSTS + security headers
- [ ] `/sitemap.xml` and `/robots.txt` return 200
- [ ] Lighthouse ≥ 95 performance, 100 SEO
- [ ] Sentry receiving events; uptime monitor green
