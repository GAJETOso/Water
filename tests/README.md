# Tests

Cross-cutting test suites (unit tests colocate with source in each workspace).

Planned layout — see [docs/TESTING.md](../docs/TESTING.md) for the full strategy:

```
tests/
├── e2e/          # Playwright journeys (browse→quote, foundation, nav, a11y)
├── visual/       # Playwright screenshot diffs (hero, dashboards, charts)
└── load/         # k6 scenarios for Phase 2 APIs
```

CI wiring: static checks + build gate every PR (`.github/workflows/ci.yml`);
Lighthouse reports on frontend PRs; E2E/visual run on merges to `main`.
