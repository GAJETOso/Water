import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import ImpactChart from "@/components/foundation/ImpactChart";
import { FOUNDATION_PROGRAMS, FOUNDATION_STATS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Water Dredging Foundation",
  description:
    "The AQUOR Water Dredging Foundation: river dredging, flood prevention, borehole drilling, clean water access, sanitation and aquatic ecosystem protection — with published impact dashboards.",
  alternates: { canonical: "/foundation" },
};

const PROGRAM_DETAILS = [
  "River & canal dredging",
  "Community desilting projects",
  "Waterway restoration",
  "Borehole drilling & rehabilitation",
  "Community purification systems",
  "Rural clean water initiatives",
  "School water infrastructure",
  "Public sanitation facilities",
  "Hygiene education campaigns",
  "Flood prevention awareness",
  "Wetland restoration",
  "Watershed conservation",
  "Aquatic ecosystem protection",
  "Water quality monitoring",
  "Volunteer cleanup events",
  "Government & NGO partnerships",
];

const ngoSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "AQUOR Water Dredging Foundation",
  parentOrganization: { "@type": "Organization", name: "AQUOR Beverages PLC" },
  description:
    "A corporate foundation improving access to clean water and protecting aquatic environments across Africa through dredging, boreholes, sanitation and ecosystem restoration.",
};

export default function FoundationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ngoSchema) }}
      />
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
        <div className="section relative">
          <SectionHeading
            eyebrow="AQUOR Water Dredging Foundation"
            title="Restoring the waterways that sustain us"
            description="Our foundation dredges rivers, prevents floods, drills boreholes and protects aquatic ecosystems — in partnership with governments, NGOs and the communities we serve."
          />
        </div>
      </section>

      {/* Impact dashboard */}
      <section className="section pb-24">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-white">Impact Dashboard</h2>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Independently audited · updated quarterly
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {FOUNDATION_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={(i % 4) * 0.1}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-3xl text-emerald-300 md:text-4xl"
                />
                <p className="mt-3 text-xs leading-relaxed text-slate-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-6">
          <ImpactChart />
        </Reveal>
      </section>

      {/* Programs */}
      <section className="section pb-24">
        <SectionHeading
          eyebrow="Four Programme Areas"
          title="Where the work happens"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FOUNDATION_PROGRAMS.map((program, i) => (
            <Reveal key={program.title} delay={(i % 2) * 0.12}>
              <div className="glass glass-hover h-full rounded-3xl p-9">
                <h3 className="font-display text-2xl text-white">{program.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{program.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-2.5">
          {PROGRAM_DETAILS.map((p) => (
            <span key={p} className="glass rounded-full px-4 py-2 text-xs text-slate-200">
              {p}
            </span>
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="section pb-28">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-12 text-center md:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-aqua-400/10" />
            <div className="relative">
              <h2 className="font-display text-3xl text-white md:text-5xl">
                Partner with the Foundation
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Governments, NGOs, donors and volunteers — join a programme, nominate a community,
                or fund a waterway restoration.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Become a Partner
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Volunteer
                </Link>
                <Link href="/esg" className="btn-ghost">
                  Read Impact Reports
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
