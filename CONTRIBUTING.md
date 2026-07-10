# Contributing to AQUOR

Thank you for helping build the AQUOR platform. This guide keeps contributions
consistent and easy to review.

## Development setup

```bash
git clone https://github.com/GAJETOso/Water.git
cd Water/frontend
npm install
npm run dev
```

Requirements: Node.js ≥ 20, npm ≥ 10.

## Branching strategy

We use a trunk-based GitFlow hybrid:

- `main` — always deployable; protected.
- `feature/<scope>-<summary>` — new work, branched from `main`.
- `fix/<scope>-<summary>` — bug fixes.
- `hotfix/<summary>` — emergency production fixes, branched from the release tag.

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(frontend): add sparkling water product section
fix(seo): correct canonical URL on ESG page
docs(api): document certificate verification endpoint
```

Types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore`.

## Pull requests

1. Keep PRs focused — one concern per PR.
2. Ensure `npm run lint`, `npm run typecheck` and `npm run build` pass in `frontend/`.
3. Include screenshots for visual changes (light + mobile viewport where relevant).
4. Fill in the PR template; link the issue it closes.
5. PRs require one approving review and green CI to merge.

## Code style

- TypeScript strict mode; no `any` unless annotated with a reason.
- Prettier formats, ESLint lints — both run in CI.
- Components: server components by default; `"use client"` only where interaction requires it.
- Respect `prefers-reduced-motion` in all new animations.
- Accessibility is not optional: semantic HTML, labelled controls, WCAG 2.2 AA contrast.

## Release process

Releases are tagged `vMAJOR.MINOR.PATCH` (SemVer) from `main` and documented in
[CHANGELOG.md](CHANGELOG.md). See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Questions

Open a [Discussion](https://github.com/GAJETOso/Water/discussions) or see
[SUPPORT.md](SUPPORT.md).
