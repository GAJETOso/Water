# Testing Strategy

## Pyramid

| Layer | Tool | Scope | Target |
|---|---|---|---|
| Static | TypeScript strict, ESLint | every file | 0 errors (CI-gated) |
| Unit | Vitest + React Testing Library | components, lib functions | 90% of `src/lib`, critical components |
| Integration | Vitest | page composition, data wiring | key routes render with data |
| E2E | Playwright | user journeys | happy paths + a11y smoke |
| Visual | Playwright screenshots | hero, dashboards, charts | diff-gated |
| Performance | Lighthouse CI | all routes | ≥95 perf, 100 SEO, ≥95 a11y |
| Load (API, Phase 2) | k6 | order & verify endpoints | p95 < 250ms @ 500 RPS |
| Security | npm audit, CodeQL, OWASP ZAP baseline | deps + deployed app | no high/critical |

## Key E2E journeys (Playwright)

1. **Browse → quote**: home → products → PET section → "Request a Quote" link
   carries the category into the WhatsApp deep link.
2. **Foundation transparency**: foundation page renders 8 impact stats and both
   charts; the sr-only data table matches the chart data.
3. **Navigation**: every navbar/footer link resolves 200; active state correct.
4. **Reduced motion**: with `prefers-reduced-motion`, no infinite animations run.
5. **Mobile**: nav drawer opens/closes; no horizontal scroll at 375px.

## Accessibility gates

- `@axe-core/playwright` scan on every route: zero serious/critical violations.
- Manual checklist per release: keyboard traversal, focus visibility,
  landmark structure, contrast (WCAG 2.2 AA).

## CI wiring

`ci.yml` runs static + build on every PR. `lighthouse.yml` publishes scores as
a PR comment. E2E/visual suites run on merges to `main` (kept off PRs for
speed until test infra is provisioned).

## Conventions

- Tests colocate as `*.test.ts(x)` next to source; E2E specs live in `tests/e2e`.
- No snapshot tests for animated components — assert semantics, not pixels
  (visual diffs are the screenshot suite's job).
- Deterministic tests: mock `Math.random` for the dashboard jitter, freeze time.
