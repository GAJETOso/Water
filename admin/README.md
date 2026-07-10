# Admin Dashboard (Phase 3)

Back-office application for AQUOR staff. Next.js + the platform GraphQL API.

## Modules

| Module | Capabilities |
|---|---|
| Orders | Search, status transitions, refunds, delivery reassignment |
| Inventory | Stock by plant/warehouse, low-stock alerts, FEFO rotation |
| Production | Live line dashboards (SCADA read models), OEE, downtime log |
| Distributors | Applications, credit limits, price-list assignment, performance |
| Customers & CRM | Profiles, segments, loyalty adjustments, campaign triggers |
| Custom jobs | Artwork proofs, approval queue, production scheduling |
| CSR / Foundation | Projects, impact metric entry (with verifier), photo evidence |
| Quality | Lab batch results, certificate registry, expiry alerts |
| Reports | Sales, revenue, export (CSV/XLSX), scheduled email reports |
| System | Users & roles (RBAC), audit log viewer, notification center |

## Non-functional requirements

- Every mutation writes to `audit_logs` (actor, diff, IP).
- Role-gated navigation (`staff` read-most, `admin` full, `auditor` read-only).
- 2FA mandatory; session timeout 30 min idle.
- All list views: server-side pagination, saved filters, column export.
