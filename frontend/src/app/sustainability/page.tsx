import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "AQUOR's sustainability ecosystem: plastic recycling and buyback, water stewardship, renewable energy, Net Zero roadmap and community water projects.",
  alternates: { canonical: "/sustainability" },
};

const PILLARS = [
  {
    id: "recycling",
    eyebrow: "Circular Plastic",
    title: "Every bottle comes back",
    stats: [
      { value: 34, suffix: "%", label: "rPET content today" },
      { value: 62, suffix: "%", label: "rPET target by 2030" },
      { value: 410, suffix: "", label: "Plastic collection centres" },
    ],
    items: [
      "Nationwide bottle recovery & buyback",
      "Food-grade rPET recycling partners",
      "Reverse logistics on every delivery route",
      "Waste segregation & collection centres",
      "Ocean, beach & river cleanup programmes",
      "Community cleanup partnerships",
    ],
  },
  {
    id: "water",
    eyebrow: "Water Stewardship",
    title: "Give back to the watershed",
    stats: [
      { value: 1.42, suffix: " L/L", label: "Water-use ratio" },
      { value: 120, suffix: "%", label: "Groundwater recharge target" },
      { value: 47, suffix: "%", label: "Renewable electricity today" },
    ],
    items: [
      "Groundwater recharge & rainwater harvesting",
      "Wetland restoration & watershed protection",
      "Leak-reduction and efficiency programmes",
      "Solar farms at 7 of 12 plants",
      "Carbon-neutrality roadmap (SBTi-aligned)",
      "Net Zero by 2045",
    ],
  },
  {
    id: "community",
    eyebrow: "Community Projects",
    title: "Water changes everything",
    stats: [
      { value: 1275, suffix: "", label: "Boreholes installed" },
      { value: 340, suffix: "", label: "School water projects" },
      { value: 52000, suffix: "+", label: "Trees planted" },
    ],
    items: [
      "Community boreholes & water schemes",
      "School water infrastructure",
      "Medical outreach & sanitation campaigns",
      "Environmental education & plastic-free campaigns",
      "Scholarships, youth & women empowerment",
      "Public hygiene campaigns",
    ],
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
        <div className="section relative">
          <SectionHeading
            eyebrow="Sustainability Ecosystem"
            title="Bottled responsibly, or not at all"
            description="Three pillars — circular plastic, water stewardship and community impact — audited annually and published in our ESG portal."
          />
        </div>
      </section>

      <div className="space-y-20 pb-28">
        {PILLARS.map((pillar, i) => (
          <section key={pillar.id} id={pillar.id} className="section scroll-mt-24">
            <div className="glass overflow-hidden rounded-3xl p-10 md:p-14">
              <div className={`grid gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                <div className="lg:[direction:ltr]">
                  <Reveal>
                    <p className="eyebrow !text-emerald-300">{pillar.eyebrow}</p>
                    <h2 className="mt-4 font-display text-3xl text-white md:text-4xl">
                      {pillar.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <ul className="mt-8 space-y-3">
                      {pillar.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
                <Reveal delay={0.2} className="grid content-center gap-4 lg:[direction:ltr]">
                  {pillar.stats.map((stat) => (
                    <div key={stat.label} className="glass rounded-2xl p-6">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        className="font-display text-4xl text-emerald-300"
                      />
                      <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section pb-28 text-center">
        <Reveal>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Dive deeper into our impact
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/foundation" className="btn-primary">
              Water Dredging Foundation
            </Link>
            <Link href="/esg" className="btn-ghost">
              ESG Portal &amp; Reports
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
