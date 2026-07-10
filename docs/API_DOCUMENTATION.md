# API Documentation

Base URL: `https://api.aquor.com/v1` · Auth: Bearer JWT (OIDC) · Format: JSON
Rate limits: 60 req/min anonymous, 600 req/min authenticated (headers:
`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`).

> Status: the API is specified here and implemented in Phase 2 (see ROADMAP.md).
> Contracts below are the source of truth for backend implementation.

## Catalog

| Method | Path | Description |
|---|---|---|
| GET | `/products` | List products; filters: `category`, `size`, `q`, `page` |
| GET | `/products/{slug}` | Product detail with variants & price tiers |
| GET | `/categories` | The six product families |

```jsonc
// GET /products/pet-500ml → 200
{
  "id": "prd_01J...",
  "slug": "pet-500ml",
  "name": "AQUOR Still Water 500ml",
  "category": "pet",
  "variants": [
    { "sku": "AQ-PET-500", "size_ml": 500, "pack": 20, "price": { "NGN": 3500, "USD": 2.4 } }
  ],
  "wholesale_tiers": [{ "min_qty": 100, "discount_pct": 12 }]
}
```

## Orders

| Method | Path | Description |
|---|---|---|
| POST | `/orders` | Create order (retail, bulk, custom-branding job) |
| GET | `/orders/{id}` | Order detail incl. delivery tracking |
| GET | `/orders` | List my orders |
| POST | `/orders/{id}/cancel` | Cancel while `status=pending` |
| POST | `/subscriptions` | Create a dispenser/delivery subscription |
| PATCH | `/subscriptions/{id}` | Pause, resume, change cadence |

Order lifecycle: `pending → confirmed → in_production? → dispatched → delivered`
(events emitted on each transition; webhooks available to distributors).

## Custom bottles

| Method | Path | Description |
|---|---|---|
| POST | `/custom-jobs` | Submit artwork + occasion + quantities |
| GET | `/custom-jobs/{id}` | Proof status, unit pricing, production ETA |
| POST | `/custom-jobs/{id}/approve-proof` | Customer approves print proof |

## Certificates

| Method | Path | Description |
|---|---|---|
| GET | `/certificates` | Public list of active certifications |
| GET | `/certificates/verify/{code}` | **Public** verification: returns issuer, scope, validity |

```jsonc
// GET /certificates/verify/AQR-ISO9001-2025-0042 → 200
{ "valid": true, "standard": "ISO 9001:2015", "issued": "2025-03-01", "expires": "2028-02-28", "scope": "Lagos Plant 1 — PET lines" }
```

## ESG & Foundation

| Method | Path | Description |
|---|---|---|
| GET | `/esg/kpis` | Current ESG KPI values with targets |
| GET | `/foundation/impact` | Impact dashboard series (km dredged, boreholes, WQI…) |
| GET | `/reports` | Published reports (PDF URLs, checksums) |

## Water supply & metering (AQUOR Flow)

| Method | Path | Description |
|---|---|---|
| POST | `/water-supply/applications` | Apply for a household/estate connection |
| GET | `/water-supply/connections/{id}` | Connection status, meter, balance |
| GET | `/water-supply/tariffs` | **Public** tiered tariff table |
| GET | `/meters/{serial}/readings?from=&to=` | Consumption series (owner or estate manager) |
| POST | `/meters/{serial}/vend` | Buy a prepaid token; amount → volume at current tier |
| GET | `/water-supply/connections/{id}/bills` | Postpaid bills with status |

```jsonc
// POST /meters/AQF-004211/vend  { "amount": 5000, "channel": "whatsapp" } → 201
{
  "token": "1846 2201 9934 5510 0827",
  "volume_m3": 13.51,
  "tier_applied": "standard",
  "meter": "AQF-004211",
  "expires": null
}
```

Metering telemetry (IoT ingest) uses a separate authenticated ingestion
endpoint with per-device keys — not part of the public API.

## Distributors

| Method | Path | Description |
|---|---|---|
| POST | `/distributors/apply` | Registration application |
| GET | `/distributors/me/pricing` | Wholesale price list |
| POST | `/distributors/me/orders` | Bulk order with credit terms |

## Webhooks

Signed with `X-Aquor-Signature` (HMAC-SHA256). Events:
`order.confirmed`, `order.dispatched`, `order.delivered`, `payment.succeeded`,
`payment.failed`, `subscription.renewed`, `custom_job.proof_ready`.

## Errors

RFC 9457 problem+json:

```json
{ "type": "https://api.aquor.com/errors/insufficient-stock", "title": "Insufficient stock", "status": 409, "detail": "Only 40 packs of AQ-PET-500 available", "instance": "/v1/orders" }
```
