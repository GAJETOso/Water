# WhatsApp Business Bot

AI-powered ordering and support over the WhatsApp Business Cloud API, with
multilingual support (EN, FR, HA, YO, IG, pidgin) and seamless human escalation.

## Architecture

```
Customer ↔ WhatsApp Cloud API ↔ Webhook (backend /integrations/whatsapp)
                                   │
                          Intent router (AI service)
                          ├── deterministic flows (orders, tracking, payments)
                          ├── RAG answers (ai/knowledge-base)
                          └── human handoff (support inbox + ticket)
```

- Webhook ingestion is **queued** (never blocks) and **idempotent** (message-id
  dedupe) — campaign broadcasts create 10k+ msg/min bursts.
- Session state in Redis (24h TTL, WhatsApp's service window).
- Every conversation logged to `support_tickets`/CRM with consent notice.

## Core flows

### 1. Order water
```
User: "I want to order water"
Bot:  [List message] What would you like?
      🧊 Sachet · 💧 PET bottles · 🏠 Dispenser 18.9L · ✨ Premium glass
User: PET bottles
Bot:  [Product cards from /products?category=pet] Pick a size & pack.
User: 500ml ×20, 10 packs
Bot:  📍 Share delivery location (or pick a saved address)
User: [location]
Bot:  Total ₦35,000 incl. delivery Thu 10–2pm. Pay now or on delivery?
      [Pay now] [Pay on delivery]
User: Pay now
Bot:  [Payment link — Paystack] ✅ Paid. Order #AQ-10422 confirmed.
      You'll get updates here. Type TRACK anytime.
```

### 2. Track delivery
`TRACK` or "where is my order" → last order status timeline + live ETA + driver contact once dispatched.

### 3. Bulk / corporate quote
Quantity ≥ 100 packs → collects org name, delivery cadence, location →
creates CRM lead → human account manager replies within SLA (2 business hours).

### 4. Custom bottles (weddings, events, corporate)
Occasion → quantity → date → artwork upload (image/PDF) → creates `custom_jobs`
record → proof returned in-chat for approval → deposit link.

### 5. Distributor registration
Business name → coverage area → volumes → creates application → status
notifications on approval + portal invite.

### 6. Support & complaints
Free-text issues get an AI answer from the knowledge base first;
"AGENT" or two failed answers → human handoff with full transcript.
Complaints create tickets with number returned in-chat.

### 7. Water token vending (AQUOR Flow prepaid meters)
```
User: "buy water" / TOKEN
Bot:  Which meter? [AQF-004211 — Home] [AQF-009832 — Shop] [Enter another]
User: AQF-004211
Bot:  How much? [₦2,000] [₦5,000] [₦10,000] [Other]
User: ₦5,000
Bot:  [Payment link] ✅ Paid. Your token:
      1846 2201 9934 5510 0827  (13.5 m³ at Standard tier)
      Enter it on the meter keypad. Balance alerts arrive here automatically.
```
Also: low-balance push alerts (opt-in), leak alerts ("continuous flow for 6h —
check for an open tap"), and connection application status updates.

## Message types used

Interactive lists, reply buttons, product catalog messages, location request,
media (artwork upload), payment links, order-status template messages
(outside the 24h window, pre-approved templates only).

## Escalation rules

- Payment disputes, medical complaints, press → always human.
- Negative sentiment (model-scored) → priority queue.
- After-hours → ticket + morning callback promise (template).

## Compliance

Opt-in recorded before marketing pushes; STOP honored globally; NDPR/GDPR
data-subject requests handled via the customer portal.
