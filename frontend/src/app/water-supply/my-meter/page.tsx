import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import UsageDashboard from "@/components/supply/UsageDashboard";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Meter Portal — AQUOR Flow",
  description:
    "Preview the AQUOR Flow customer portal: daily usage charts, prepaid token balance and top-up history, leak and low-balance alerts for smart-metered household water.",
  alternates: { canonical: "/water-supply/my-meter" },
};

const CAPABILITIES = [
  { name: "Usage analytics", detail: "Daily, weekly and monthly consumption with tier-boundary markers so you see when a heavier band approaches." },
  { name: "One-tap top-up", detail: "Buy tokens with saved cards or bank transfer; tokens auto-load on connected meters — no keypad entry needed." },
  { name: "Alerts that matter", detail: "Leak, tamper, low-balance and pressure alerts pushed to WhatsApp, Telegram, email or the app." },
  { name: "Household sharing", detail: "Add family members or tenants with view-only or top-up rights per meter." },
  { name: "Multi-meter view", detail: "Homes, shops and rentals in one account; landlords see all units with per-tenant statements." },
  { name: "Postpaid e-billing", detail: "Itemised monthly bills, downloadable receipts and auto-debit options for postpaid connections." },
];

export default function MyMeterPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="AQUOR Flow — Customer Portal"
            title="Your water, at a glance"
            description="A live preview of the My Meter portal every AQUOR Flow customer gets — usage, balance, tokens and alerts in one place."
          />
          <Reveal delay={0.15} className="mt-6 text-center">
            <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua-300" />
              Interactive demo with sample telemetry — live accounts ship with the metering platform
            </span>
          </Reveal>
        </div>
      </section>

      <section className="section pb-24">
        <Reveal>
          <UsageDashboard />
        </Reveal>
      </section>

      <section className="section pb-24">
        <SectionHeading
          eyebrow="Portal Capabilities"
          title="Everything a household needs"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.1}>
              <div className="glass glass-hover h-full rounded-2xl p-7">
                <h3 className="text-base font-semibold text-white">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pb-28">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-12 text-center md:p-16">
            <div className="absolute inset-0 bg-hero-radial" />
            <div className="relative">
              <h2 className="font-display text-3xl text-white md:text-4xl">
                Ready for metered water at home?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Apply for a connection and this dashboard becomes yours — with real telemetry from
                your own smart meter.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace("+", "")}?text=Hello%20AQUOR%2C%20I%27d%20like%20a%20metered%20water%20connection.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Apply for a Connection
                </a>
                <Link href="/water-supply" className="btn-ghost">
                  About AQUOR Flow
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
