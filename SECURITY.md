# Security Policy

## Supported versions

| Version | Supported |
|---|---|
| `main` / latest release | ✅ |
| Older tags | ❌ |

## Reporting a vulnerability

**Do not open a public issue for security vulnerabilities.**

- Email **security@aquor.com** with a description, reproduction steps and impact.
- Or use GitHub's [private vulnerability reporting](https://github.com/GAJETOso/Water/security/advisories/new).

You will receive an acknowledgement within **48 hours** and a triage decision
within **5 business days**. We ask for 90 days of coordinated disclosure.

## Scope

In scope: this repository's application code, infrastructure manifests, CI
workflows and published deployments.
Out of scope: social engineering, physical attacks, denial-of-service testing
against production, and third-party services we integrate with.

## Security practices in this codebase

- Strict security headers (HSTS, X-Frame-Options, nosniff, referrer & permissions policies)
- No secrets in the repository — configuration via `.env` (see `.env.example`)
- Dependency updates via Dependabot; `npm audit` in CI
- Principle of least privilege in Kubernetes manifests and Terraform roles
- GDPR / NDPR alignment: no tracking without consent, data minimisation in forms
