#!/usr/bin/env bash
# Reset the local development database: drop, recreate, apply schema + seed.
# Usage: DATABASE_URL=postgresql://user:pass@localhost:5432/postgres ./scripts/db-reset.sh
set -euo pipefail

ADMIN_URL="${DATABASE_URL:-postgresql://aquor:changeme@localhost:5432/postgres}"
DB_NAME="${DB_NAME:-aquor}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Recreating database '$DB_NAME'…"
psql "$ADMIN_URL" -v ON_ERROR_STOP=1 <<SQL
DROP DATABASE IF EXISTS $DB_NAME;
CREATE DATABASE $DB_NAME;
SQL

TARGET_URL="${ADMIN_URL%/*}/$DB_NAME"
psql "$TARGET_URL" -v ON_ERROR_STOP=1 -f "$ROOT/database/schema.sql"
psql "$TARGET_URL" -v ON_ERROR_STOP=1 -f "$ROOT/database/seed.sql"

echo "✅ $DB_NAME ready."
