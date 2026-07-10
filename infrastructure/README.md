# Infrastructure

| Path | Purpose |
|---|---|
| `docker/Dockerfile.frontend` | Multi-stage, non-root, standalone Next.js image |
| `docker/docker-compose.yml` | Dev stack: web + PostgreSQL 16 (schema auto-loaded) + Redis 7 |
| `k8s/deployment.yaml` | Deployment, Service, ConfigMap, HPA (3–12 pods), TLS Ingress |
| `terraform/main.tf` | AWS skeleton: VPC, RDS Postgres 16, ElastiCache Redis, S3, ECR |
| `nginx/nginx.conf` | Self-hosted reverse proxy: TLS, HSTS, rate limiting, static caching |

## Edge & security (Cloudflare)

Put Cloudflare in front of any origin:

- **DNS + proxy** for `aquor.com` / `www.aquor.com`
- **WAF** managed rules + OWASP core ruleset
- **DDoS** protection (enabled by default when proxied)
- **Rate limiting rule**: 100 req/10s per IP on `/api/*` (Phase 2)
- **Cache rules**: cache everything on `/_next/static/*`, respect origin headers elsewhere
- **TLS**: Full (strict), minimum TLS 1.2, HSTS preload

## Secrets

No secrets live in this repo. Sources of truth:

- Local: `.env` (from `.env.example`)
- CI: GitHub Encrypted Secrets
- K8s: `Secret` objects synced from AWS Secrets Manager via External Secrets Operator
- Terraform: RDS master password is managed by AWS (`manage_master_user_password`)

## Environments

`terraform workspace` per environment (`staging`, `production`); K8s manifests
are environment-agnostic — image tag and ConfigMap values are injected by CD.
