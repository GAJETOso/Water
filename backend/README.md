# Backend — NestJS API Platform (Phase 2)

Implementation target for the platform specified across this repo. Everything
needed to build it already exists:

| Contract | Where |
|---|---|
| Module architecture & seams | [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) |
| REST API contracts | [docs/API_DOCUMENTATION.md](../docs/API_DOCUMENTATION.md) |
| Database schema (validated) | [database/schema.sql](../database/schema.sql) |
| Bot webhook behavior | [whatsapp-bot/](../whatsapp-bot/) · [telegram-bot/](../telegram-bot/) |
| AI service | [ai/README.md](../ai/README.md) |
| Scale targets | [docs/SCALABILITY.md](../docs/SCALABILITY.md) |

## Planned module layout

```
src/
├── main.ts                  # bootstrap: helmet, CORS, rate limits, OTel
├── modules/
│   ├── catalog/             # products, variants, price lists
│   ├── orders/              # carts, orders, deliveries, subscriptions
│   ├── customers/           # accounts, segments, loyalty, distributors
│   ├── payments/            # paystack/flutterwave/stripe orchestration
│   ├── certificates/        # registry + public verification
│   ├── esg/                 # foundation projects, impact metrics, reports
│   ├── notifications/       # email/sms/whatsapp/telegram/push fan-out
│   ├── ai/                  # assistant router + RAG
│   └── integrations/        # erp, mes/scada read models, crm sync
├── common/                  # guards (RBAC), interceptors, problem+json filter
└── database/                # migrations, repositories
```

## Conventions (binding for Phase 2)

- One module = one bounded context = owns its tables; cross-module access via
  services/events only, never foreign repositories.
- Outbox pattern for events; consumers idempotent.
- DTO validation with `class-validator`; responses typed end-to-end.
- Errors: RFC 9457 problem+json (examples in the API doc).
- AuthZ: RBAC guard with roles from the `users.role` enum; 2FA for staff/admin.
- Tests: unit per service, integration per module against a real Postgres
  (Testcontainers), contract tests against API_DOCUMENTATION.md.
