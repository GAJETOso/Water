# Shared Packages (Phase 2)

Cross-workspace TypeScript packages (npm workspaces / turborepo when the
second app lands):

| Package | Contents |
|---|---|
| `@aquor/types` | API DTOs generated from the OpenAPI spec; DB enums mirrored from `database/schema.sql` |
| `@aquor/ui` | Design-system React components promoted out of `frontend/src/components` |
| `@aquor/config` | Shared ESLint/Prettier/TS configs |
| `@aquor/sdk` | Typed API client used by web, admin, mobile (via codegen) |

Rule: nothing moves here until **two** consumers need it — premature extraction
is how monorepos rot.
