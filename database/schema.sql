-- AQUOR Platform — PostgreSQL 16 schema
-- Conventions: snake_case, UUID PKs, timestamptz, soft deletes only where audit requires.

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- ── Identity & access ────────────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('customer', 'distributor', 'supplier', 'staff', 'admin', 'auditor');

CREATE TABLE users (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email         citext UNIQUE,
    phone         text UNIQUE,
    full_name     text NOT NULL,
    role          user_role NOT NULL DEFAULT 'customer',
    password_hash text,                -- null when using external IdP
    idp_subject   text UNIQUE,         -- Clerk/Auth.js subject
    two_fa_enabled boolean NOT NULL DEFAULT false,
    locale        text NOT NULL DEFAULT 'en',
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE addresses (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label      text NOT NULL DEFAULT 'Home',
    line1      text NOT NULL,
    city       text NOT NULL,
    state      text NOT NULL,
    country    char(2) NOT NULL DEFAULT 'NG',
    geo        point,
    is_default boolean NOT NULL DEFAULT false
);

-- ── Catalog ──────────────────────────────────────────────────────────────────

CREATE TYPE product_category AS ENUM ('sachet', 'pet', 'dispenser', 'premium', 'custom', 'specialty');

CREATE TABLE products (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        text UNIQUE NOT NULL,
    name        text NOT NULL,
    category    product_category NOT NULL,
    description text NOT NULL DEFAULT '',
    is_active   boolean NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE product_variants (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku         text UNIQUE NOT NULL,
    size_ml     integer,               -- null for sachet bales etc.
    pack_qty    integer NOT NULL DEFAULT 1,
    weight_g    integer,
    is_active   boolean NOT NULL DEFAULT true
);

CREATE TABLE price_lists (
    id       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name     text NOT NULL,            -- retail, wholesale-tier-1, hotel, export…
    currency char(3) NOT NULL DEFAULT 'NGN'
);

CREATE TABLE prices (
    variant_id    uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    price_list_id uuid NOT NULL REFERENCES price_lists(id) ON DELETE CASCADE,
    unit_amount   numeric(12,2) NOT NULL CHECK (unit_amount >= 0),
    min_qty       integer NOT NULL DEFAULT 1,
    PRIMARY KEY (variant_id, price_list_id, min_qty)
);

-- ── Orders & fulfilment ──────────────────────────────────────────────────────

CREATE TYPE order_status AS ENUM ('pending','confirmed','in_production','dispatched','delivered','cancelled');
CREATE TYPE order_channel AS ENUM ('web','whatsapp','telegram','phone','portal','pos');

CREATE TABLE orders (
    id           uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id      uuid REFERENCES users(id),
    channel      order_channel NOT NULL DEFAULT 'web',
    status       order_status NOT NULL DEFAULT 'pending',
    currency     char(3) NOT NULL DEFAULT 'NGN',
    subtotal     numeric(12,2) NOT NULL DEFAULT 0,
    discount     numeric(12,2) NOT NULL DEFAULT 0,
    delivery_fee numeric(12,2) NOT NULL DEFAULT 0,
    total        numeric(12,2) NOT NULL DEFAULT 0,
    address_id   uuid REFERENCES addresses(id),
    placed_at    timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (id, placed_at)          -- partition key must be part of the PK
) PARTITION BY RANGE (placed_at);

CREATE TABLE orders_default PARTITION OF orders DEFAULT;

CREATE TABLE order_items (
    order_id    uuid NOT NULL,
    placed_at   timestamptz NOT NULL,
    variant_id  uuid NOT NULL REFERENCES product_variants(id),
    qty         integer NOT NULL CHECK (qty > 0),
    unit_amount numeric(12,2) NOT NULL,
    PRIMARY KEY (order_id, placed_at, variant_id),
    FOREIGN KEY (order_id, placed_at) REFERENCES orders(id, placed_at) ON DELETE CASCADE
);

CREATE TABLE order_events (
    id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id   uuid NOT NULL,
    status     order_status NOT NULL,
    note       text,
    created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON order_events (order_id, created_at);

CREATE TYPE subscription_status AS ENUM ('active','paused','cancelled');

CREATE TABLE subscriptions (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     uuid NOT NULL REFERENCES users(id),
    variant_id  uuid NOT NULL REFERENCES product_variants(id),
    qty         integer NOT NULL,
    cadence_days integer NOT NULL DEFAULT 7,
    status      subscription_status NOT NULL DEFAULT 'active',
    next_run_at timestamptz NOT NULL,
    address_id  uuid REFERENCES addresses(id)
);

-- ── Custom bottle jobs ───────────────────────────────────────────────────────

CREATE TYPE custom_job_status AS ENUM ('submitted','proofing','proof_approved','in_production','delivered','cancelled');

CREATE TABLE custom_jobs (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     uuid NOT NULL REFERENCES users(id),
    occasion    text NOT NULL,           -- wedding, conference, campaign…
    variant_id  uuid REFERENCES product_variants(id),
    qty         integer NOT NULL,
    artwork_url text,
    qr_payload  text,
    status      custom_job_status NOT NULL DEFAULT 'submitted',
    event_date  date,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- ── Payments ─────────────────────────────────────────────────────────────────

CREATE TYPE payment_status AS ENUM ('initiated','succeeded','failed','refunded');

CREATE TABLE payments (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id     uuid NOT NULL,
    provider     text NOT NULL,          -- paystack | flutterwave | stripe
    provider_ref text UNIQUE,
    amount       numeric(12,2) NOT NULL,
    currency     char(3) NOT NULL,
    status       payment_status NOT NULL DEFAULT 'initiated',
    created_at   timestamptz NOT NULL DEFAULT now()
);

-- ── Distribution network ─────────────────────────────────────────────────────

CREATE TABLE distributors (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      uuid UNIQUE NOT NULL REFERENCES users(id),
    business_name text NOT NULL,
    coverage_area text NOT NULL,
    credit_limit numeric(12,2) NOT NULL DEFAULT 0,
    price_list_id uuid REFERENCES price_lists(id),
    approved_at  timestamptz
);

-- ── Manufacturing telemetry (read model fed by MES/SCADA) ────────────────────

CREATE TABLE plants (
    id       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name     text NOT NULL,
    city     text NOT NULL,
    capacity_bph integer
);

CREATE TABLE production_snapshots (
    id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    plant_id    uuid NOT NULL REFERENCES plants(id),
    line_name   text NOT NULL,
    status      text NOT NULL,
    output_bph  integer NOT NULL,
    efficiency  numeric(5,2) NOT NULL,
    recorded_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON production_snapshots (plant_id, recorded_at DESC);

-- ── Quality & certificates ───────────────────────────────────────────────────

CREATE TABLE lab_batches (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    plant_id    uuid NOT NULL REFERENCES plants(id),
    batch_code  text UNIQUE NOT NULL,
    tested_at   timestamptz NOT NULL,
    passed      boolean NOT NULL,
    parameters  jsonb NOT NULL DEFAULT '{}'::jsonb   -- {ph: 7.2, tds: 41, ...}
);

CREATE TABLE certificates (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code        text UNIQUE NOT NULL,    -- AQR-ISO9001-2025-0042
    standard    text NOT NULL,
    issuer      text NOT NULL,
    scope       text NOT NULL,
    issued_on   date NOT NULL,
    expires_on  date NOT NULL,
    document_url text,
    revoked     boolean NOT NULL DEFAULT false
);

-- ── ESG & Foundation ─────────────────────────────────────────────────────────

CREATE TABLE foundation_projects (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,
    program     text NOT NULL,           -- dredging | water_access | sanitation | ecosystem
    state       text NOT NULL,
    community   text,
    started_on  date,
    completed_on date,
    summary     text
);

CREATE TABLE impact_metrics (
    id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id  uuid REFERENCES foundation_projects(id),
    metric      text NOT NULL,           -- km_dredged | boreholes | people_served | wqi | plastic_tonnes | volunteers
    value       numeric(14,2) NOT NULL,
    period      daterange NOT NULL,
    verified_by text
);
CREATE INDEX ON impact_metrics (metric, period);

CREATE TABLE esg_reports (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title       text NOT NULL,
    year        integer NOT NULL,
    kind        text NOT NULL,           -- sustainability | annual | carbon | plastic | foundation
    file_url    text NOT NULL,
    sha256      text NOT NULL,
    published_at timestamptz NOT NULL DEFAULT now()
);

-- ── Household water supply & smart metering (AQUOR Flow) ────────────────────

CREATE TYPE connection_status AS ENUM ('applied','surveyed','installing','active','suspended','closed');
CREATE TYPE meter_mode AS ENUM ('prepaid','postpaid');
CREATE TYPE bill_status AS ENUM ('issued','paid','overdue','void');

CREATE TABLE water_schemes (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name            text NOT NULL,
    kind            text NOT NULL DEFAULT 'municipal',   -- municipal | estate | institution | standalone
    city            text NOT NULL,
    commissioned_on date
);

CREATE TABLE water_connections (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      uuid NOT NULL REFERENCES users(id),
    address_id   uuid REFERENCES addresses(id),
    scheme_id    uuid REFERENCES water_schemes(id),
    status       connection_status NOT NULL DEFAULT 'applied',
    applied_at   timestamptz NOT NULL DEFAULT now(),
    activated_at timestamptz
);

CREATE TABLE water_meters (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id uuid NOT NULL REFERENCES water_connections(id),
    serial        text UNIQUE NOT NULL,
    kind          text NOT NULL DEFAULT 'ultrasonic',    -- ultrasonic | mechanical
    mode          meter_mode NOT NULL DEFAULT 'prepaid',
    installed_on  date,
    removed_on    date                                    -- null = currently installed
);

-- High-volume IoT telemetry; readings are cumulative register values (m³).
CREATE TABLE meter_readings (
    id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    meter_id    uuid NOT NULL REFERENCES water_meters(id),
    reading_m3  numeric(12,3) NOT NULL CHECK (reading_m3 >= 0),
    source      text NOT NULL DEFAULT 'iot',              -- iot | manual | estimate
    recorded_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON meter_readings (meter_id, recorded_at DESC);

CREATE TABLE water_tariffs (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,                            -- lifeline | standard | comfort | commercial
    min_m3      numeric(8,2) NOT NULL,
    max_m3      numeric(8,2),                             -- null = unbounded top tier
    rate_per_m3 numeric(10,2) NOT NULL,
    currency    char(3) NOT NULL DEFAULT 'NGN',
    effective   daterange NOT NULL
);

-- Prepaid top-ups: money in, STS-style token out.
CREATE TABLE meter_vends (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    meter_id   uuid NOT NULL REFERENCES water_meters(id),
    amount     numeric(12,2) NOT NULL CHECK (amount > 0),
    volume_m3  numeric(10,3) NOT NULL,
    token      text UNIQUE NOT NULL,
    channel    order_channel NOT NULL DEFAULT 'whatsapp',
    created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON meter_vends (meter_id, created_at DESC);

-- Postpaid monthly billing.
CREATE TABLE water_bills (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id uuid NOT NULL REFERENCES water_connections(id),
    period        daterange NOT NULL,
    volume_m3     numeric(10,3) NOT NULL,
    amount        numeric(12,2) NOT NULL,
    status        bill_status NOT NULL DEFAULT 'issued',
    issued_at     timestamptz NOT NULL DEFAULT now(),
    UNIQUE (connection_id, period)
);

-- ── Support & CRM ────────────────────────────────────────────────────────────

CREATE TYPE ticket_status AS ENUM ('open','pending','resolved','closed');

CREATE TABLE support_tickets (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    uuid REFERENCES users(id),
    channel    order_channel NOT NULL DEFAULT 'web',
    subject    text NOT NULL,
    status     ticket_status NOT NULL DEFAULT 'open',
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE loyalty_ledger (
    id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id    uuid NOT NULL REFERENCES users(id),
    points     integer NOT NULL,         -- +earn / -redeem
    reason     text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- ── Audit ────────────────────────────────────────────────────────────────────

CREATE TABLE audit_logs (
    id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_id   uuid,
    action     text NOT NULL,
    entity     text NOT NULL,
    entity_id  text,
    diff       jsonb,
    ip         inet,
    created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON audit_logs (entity, entity_id, created_at DESC);

COMMIT;
