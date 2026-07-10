# Telegram Bot (@aquor_bot)

Customer service, ordering and community engagement on Telegram.

## Command map

| Command | Flow |
|---|---|
| `/start` | Welcome + main menu (inline keyboard) |
| `/order` | Catalog browse → cart → checkout (payment link) |
| `/track` | Order status timeline with live updates |
| `/catalog` | Product families with photos & prices |
| `/subscribe` | Dispenser/delivery subscription setup |
| `/distributor` | Distributor onboarding application |
| `/events` | Custom-bottle event orders (weddings, conferences…) |
| `/promo` | Current promotions & coupon redemption |
| `/feedback` | Structured feedback collection (rating + comment) |
| `/token` | Buy prepaid water tokens for AQUOR Flow meters |
| `/meter` | Consumption history, balance and leak alerts per meter |
| `/support` | AI Q&A → human handoff |
| `/invoice` | Resend invoice PDFs for past orders |

## Flow: order placement

```
/order → inline keyboard: [Sachet][PET][Dispenser][Premium][Specialty]
       → size/pack selection (paginated inline buttons)
       → quantity (numeric keyboard prompt)
       → delivery address (saved addresses or location share)
       → summary + [Pay Online][Pay on Delivery]
       → payment confirmation webhook → "✅ Order #AQ-10423 confirmed"
```

## Notifications & broadcasts

- Per-user: order confirmed / dispatched / delivered, subscription reminders,
  payment receipts.
- **Broadcast channels**: @aquor_news (promotions, new products) and
  @aquor_impact (Foundation project updates) — bot posts, users opt in by joining.
- Group support: the bot can be added to distributor groups for stock
  announcements and order collection (admin-approved groups only).

## Implementation notes

- Long-polling in dev, webhook in production (same backend intent router as
  the WhatsApp bot — one brain, two transports).
- Payments: Telegram deep-links to Paystack/Flutterwave/Stripe checkout
  (native Telegram Payments where supported).
- State machine per chat in Redis; transcripts to CRM with consent.
- Rate limiting per chat-id; media size caps on artwork uploads.
