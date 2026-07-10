# Scalability Roadmap — 10M+ Users

## Stage 0 (today): static edge

All marketing routes are SSG → served entirely from CDN edge. Effectively
unlimited read scale; origin only builds. **Cost ≈ CDN egress.**

## Stage 1: commerce online (≤100k MAU)

- Single-region K8s cluster: 3× web pods, 3× API pods, HPA on CPU/RPS.
- PostgreSQL primary + 1 read replica (PgBouncer pooling).
- Redis for sessions, carts, rate limits.
- Async work (emails, invoices, bot fan-out) via BullMQ on Redis.

## Stage 2: national scale (≤1M MAU)

- Read replicas per workload (portal reads vs. analytics).
- CQRS read models for catalogs and dashboards (Redis/materialised views).
- Media & reports fully on S3+CDN with signed URLs.
- Partition `orders` and `order_events` by month; archive to object storage.
- Observability SLOs: p95 API < 250 ms, error budget 0.1%.

## Stage 3: continental scale (10M+ MAU)

- **Multi-region active/passive** (Lagos/af-south-1 primary, eu-west failover):
  RPO ≤ 5 min via streaming replication, RTO ≤ 30 min via warm standby.
- Regional edge caches for catalog/API GETs (stale-while-revalidate).
- Extract hot modules into services along existing seams: `orders`,
  `notifications`, `ai` first. Kafka (or SNS/SQS) replaces Redis pub/sub.
- WhatsApp/Telegram webhook ingestion behind a queue — bots are the largest
  burst source (campaign broadcasts) and must never backpressure checkout.
- Database: shard customers by region key only if write contention demands it;
  prefer partitioning + replicas first.

## Load characteristics to design for

| Surface | Pattern | Mitigation |
|---|---|---|
| Marketing site | Broadcast spikes (TV/campaign) | Pure CDN, no origin |
| WhatsApp bot | 10k msgs/min bursts | Queue + idempotent handlers |
| Order checkout | Paydays, holidays | HPA + PSP redundancy |
| Impact dashboards | Steady | Cached read models, 5-min TTL |
| Certificate verification | Viral QR scans | Public CDN-cached GET |

## Cost guardrails

Scale-to-zero staging, spot nodes for async workers, per-module cost
allocation labels in Terraform.
