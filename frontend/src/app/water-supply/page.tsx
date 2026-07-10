import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import MeterDial from "@/components/supply/MeterDial";
import {
  COMPANY,
  METER_FEATURES,
  SUPPLY_STATS,
  SUPPLY_STEPS,
  TARIFF_TIERS,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Household Water Supply — AQUOR Flow",
  description:
    "AQUOR Flow delivers metered piped water to households and estates: ultrasonic smart meters, prepaid water tokens via WhatsApp, tiered tariffs, leak alerts and 24/7 quality monitoring.",
  alternates: { canonical: "/water-supply" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AQUOR Flow — Metered Household Water Supply",
  provider: { "@type": "Organization", name: "AQUOR Beverages PLC" },
  serviceType: "Piped drinking water supply with smart metering",
  areaServed: "Nigeria",
  description:
    "Piped, purified water supplied to households, estates and institutions through ultrasonic smart meters with prepaid token vending and postpaid billing.",
};

export default function WaterSupplyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="eyebrow">AQUOR Flow — Utility Division</p>
              <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-white md:text-6xl">
                Purified water,
                <br />
                <span className="text-gradient">piped to your taps.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                The same nine-stage purified water — supplied continuously to households, estates
                and institutions through smart-metered connections. Pay only for what flows, top up
                in seconds on WhatsApp.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${COMPANY.whatsapp.replace("+", "")}?text=Hello%20AQUOR%2C%20I%27d%20like%20a%20metered%20water%20connection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Apply for a Connection
              </a>
              <a href="#tariffs" className="btn-ghost">
                See Tariffs
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <MeterDial />
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section pb-24">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl p-8 md:grid-cols-4 md:p-12">
          {SUPPLY_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-4xl text-white"
              />
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section pb-24">
        <SectionHeading
          eyebrow="From Application to Flowing Taps"
          title="Connected in four steps"
          description="Most urban connections are live within ten working days of survey approval."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SUPPLY_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.1}>
              <div className="glass glass-hover h-full rounded-3xl p-8">
                <span className="text-gradient font-display text-4xl">{s.step}</span>
                <h3 className="mt-4 font-display text-xl text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Smart metering features */}
      <section className="section pb-24">
        <SectionHeading
          eyebrow="Smart Metering"
          title="A meter that works for you"
          description="IoT-connected ultrasonic meters make water fair, transparent and leak-proof."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {METER_FEATURES.map((f, i) => (
            <Reveal key={f.name} delay={(i % 3) * 0.1}>
              <div className="glass glass-hover h-full rounded-2xl p-7">
                <h3 className="text-base font-semibold text-white">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tariffs */}
      <section id="tariffs" className="section scroll-mt-24 pb-24">
        <SectionHeading
          eyebrow="Transparent Pricing"
          title="Tiered tariffs, fair by design"
          description="A subsidised lifeline band protects essential use; heavier consumption pays its way. Prepaid and postpaid follow the same tiers."
        />
        <Reveal className="mt-12 overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              AQUOR Flow monthly consumption tariff tiers in naira per cubic metre
            </caption>
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-[0.15em] text-slate-400">
                <th scope="col" className="px-7 py-4 font-semibold">Tier</th>
                <th scope="col" className="px-7 py-4 font-semibold">Monthly consumption</th>
                <th scope="col" className="px-7 py-4 font-semibold">Rate</th>
                <th scope="col" className="hidden px-7 py-4 font-semibold md:table-cell">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {TARIFF_TIERS.map((tier) => (
                <tr key={tier.name} className="bg-white/[0.02] transition-colors hover:bg-white/[0.05]">
                  <th scope="row" className="px-7 py-5 font-display text-lg font-medium text-aqua-300">
                    {tier.name}
                  </th>
                  <td className="px-7 py-5 text-slate-300">{tier.range}</td>
                  <td className="px-7 py-5 tabular-nums text-white">
                    ₦{tier.rate}
                    <span className="text-xs text-slate-500"> / m³</span>
                  </td>
                  <td className="hidden px-7 py-5 text-slate-400 md:table-cell">{tier.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-4 text-xs text-slate-600">
          Indicative tariffs for regulated pilot zones; connection fees quoted at survey. 1 m³ = 1,000 litres.
        </p>
      </section>

      {/* Estates & institutions */}
      <section className="section pb-28">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-12 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/20 via-transparent to-aqua-400/10" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h2 className="font-display text-3xl text-white md:text-4xl">
                  Estates, institutions &amp; developers
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
                  Bulk master metering with per-unit sub-meters, landlord revenue dashboards,
                  automated reconciliation and SLA-backed pressure guarantees — for gated estates,
                  schools, hospitals, hotels and new developments. Boreholes and treatment plants
                  can be built, operated and metered on-site where the network hasn&apos;t reached.
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Estate master + unit sub-metering",
                    "Landlord & facility dashboards",
                    "Build-operate-transfer schemes",
                    "On-site treatment & storage",
                    "SLA-backed uptime & pressure",
                    "NRW (loss) analytics",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="h-1 w-1 rounded-full bg-aqua-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace("+", "")}?text=Hello%20AQUOR%2C%20I%27d%20like%20to%20discuss%20estate%20water%20supply.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center"
                >
                  Talk to the Utility Team
                </a>
                <Link href="/contact" className="btn-ghost justify-center">
                  Request a Site Survey
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
