import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import { ESG_KPIS } from "@/lib/data";

export const metadata: Metadata = {
  title: "ESG Portal",
  description:
    "AQUOR's ESG portal: sustainability reports, carbon and plastic-reduction dashboards, SDG mapping, certificate verification and a public download center.",
  alternates: { canonical: "/esg" },
};

const REPORTS = [
  { name: "Sustainability Report 2025", type: "PDF · 8.4 MB", year: "2025" },
  { name: "Annual Report 2025", type: "PDF · 12.1 MB", year: "2025" },
  { name: "Carbon Disclosure Report 2025", type: "PDF · 3.2 MB", year: "2025" },
  { name: "Plastic Footprint Report 2025", type: "PDF · 2.7 MB", year: "2025" },
  { name: "Foundation Impact Report 2025", type: "PDF · 5.9 MB", year: "2025" },
  { name: "Sustainability Report 2024", type: "PDF · 7.8 MB", year: "2024" },
];

const SDGS = [
  { num: 3, name: "Good Health & Well-being", detail: "Safe drinking water, medical hydration, health outreach." },
  { num: 6, name: "Clean Water & Sanitation", detail: "Boreholes, purification systems, sanitation facilities." },
  { num: 7, name: "Affordable & Clean Energy", detail: "Solar plants and a 100% renewables roadmap." },
  { num: 8, name: "Decent Work & Growth", detail: "14,000+ jobs across manufacturing and distribution." },
  { num: 12, name: "Responsible Consumption", detail: "rPET, buyback schemes and circular packaging." },
  { num: 13, name: "Climate Action", detail: "SBTi-aligned Net Zero 2045 pathway." },
  { num: 14, name: "Life Below Water", detail: "Ocean cleanup and waterway plastic recovery." },
  { num: 17, name: "Partnerships for the Goals", detail: "Government, NGO and community coalitions." },
];

export default function EsgPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="ESG Portal"
            title="Measured. Audited. Published."
            description="Environmental, social and governance performance — reported against GRI standards, mapped to the SDGs and verified by independent auditors."
          />
        </div>
      </section>

      {/* KPIs */}
      <section className="section pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ESG_KPIS.map((kpi, i) => (
            <Reveal key={kpi.label} delay={i * 0.1}>
              <div className="glass glass-hover h-full rounded-2xl p-7">
                {kpi.label.startsWith("Net Zero") ? (
                  <p className="font-display text-4xl text-aqua-300">Net&nbsp;Zero</p>
                ) : (
                  <Counter
                    value={kpi.value}
                    suffix={kpi.suffix}
                    className="font-display text-4xl text-aqua-300"
                  />
                )}
                <p className="mt-3 text-sm font-semibold text-white">{kpi.label}</p>
                <p className="mt-1 text-xs text-slate-500">{kpi.now}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Download center */}
      <section className="section pb-24">
        <SectionHeading eyebrow="Download Center" title="Reports & disclosures" align="left" />
        <div className="mt-10 divide-y divide-white/5 overflow-hidden rounded-3xl border border-white/10">
          {REPORTS.map((report, i) => (
            <Reveal key={report.name} delay={i * 0.05}>
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.03] px-7 py-5 transition-colors hover:bg-white/[0.06]">
                <div>
                  <p className="text-sm font-semibold text-white">{report.name}</p>
                  <p className="text-xs text-slate-500">{report.type}</p>
                </div>
                <span className="btn-ghost cursor-not-allowed !px-5 !py-2 text-xs opacity-80" title="Sample document — available at launch">
                  Download ↓
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-600">
          Documents shown are placeholders; production reports are published through the CMS.
        </p>
      </section>

      {/* SDG mapping */}
      <section className="section pb-28">
        <SectionHeading
          eyebrow="UN Sustainable Development Goals"
          title="Where AQUOR moves the needle"
          align="left"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SDGS.map((sdg, i) => (
            <Reveal key={sdg.num} delay={(i % 4) * 0.08}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ocean-500 to-aqua-400 font-display text-lg text-navy-950">
                  {sdg.num}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">{sdg.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{sdg.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Link href="/certifications" className="btn-primary">
            Verify Our Certificates
          </Link>
        </Reveal>
      </section>
    </>
  );
}
