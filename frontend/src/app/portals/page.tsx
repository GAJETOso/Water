import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Portals",
  description:
    "AQUOR's digital ecosystem: distributor, customer, supplier, vendor and investor portals, careers, media center, knowledge base and support.",
  alternates: { canonical: "/portals" },
};

const PORTALS: { name: string; detail: string; status: string; href?: string }[] = [
  { name: "My Meter Portal", detail: "AQUOR Flow smart-meter dashboard: daily usage, token balance, top-up history and leak alerts.", status: "Live Demo", href: "/water-supply/my-meter" },
  { name: "Distributor Portal", detail: "Wholesale pricing, route planning, order pipelines, credit and rebate tracking.", status: "Login" },
  { name: "Customer Portal", detail: "Order history, delivery subscriptions, invoices, loyalty points and support tickets.", status: "Login" },
  { name: "Supplier Portal", detail: "RFQs, purchase orders, delivery schedules and payment status for our supply partners.", status: "Login" },
  { name: "Vendor Portal", detail: "Onboarding, compliance documents and contract management for service vendors.", status: "Login" },
  { name: "Investor Relations", detail: "Financial reports, disclosures, ESG data and shareholder communications.", status: "Explore" },
  { name: "Career Portal", detail: "Open roles across manufacturing, logistics, technology and the Foundation.", status: "Explore" },
  { name: "Media & Press Center", detail: "Press releases, brand assets, imagery and media contact points.", status: "Explore" },
  { name: "Knowledge Center & FAQ", detail: "Product guides, hydration science, water quality documentation and help articles.", status: "Explore" },
  { name: "Complaint & Support Center", detail: "Raise support tickets, track resolutions, or escalate through live chat.", status: "Get Help" },
];

export default function PortalsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="Digital Ecosystem"
            title="One AQUOR, many doors"
            description="Purpose-built portals for every relationship — distributors, customers, suppliers, investors, journalists and future employees."
          />
        </div>
      </section>

      <section className="section pb-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PORTALS.map((portal, i) => (
            <Reveal key={portal.name} delay={(i % 3) * 0.08}>
              <div className="glass glass-hover flex h-full flex-col rounded-2xl p-8">
                <h3 className="font-display text-xl text-white">{portal.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{portal.detail}</p>
                {portal.href ? (
                  <Link
                    href={portal.href}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-aqua-300/50 bg-aqua-300/10 px-5 py-2 text-xs font-semibold text-aqua-300 transition-colors hover:bg-aqua-300/20"
                  >
                    {portal.status} →
                  </Link>
                ) : (
                  <span
                    className="mt-6 inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-full border border-aqua-300/30 px-5 py-2 text-xs font-semibold text-aqua-300/80"
                    title="Portal apps ship with the platform backend"
                  >
                    {portal.status} →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <p className="text-sm text-slate-500">
            Portal applications are part of the platform rollout — see the{" "}
            <Link href="/contact" className="text-aqua-300 hover:underline">
              contact page
            </Link>{" "}
            to be onboarded early.
          </p>
        </Reveal>
      </section>
    </>
  );
}
