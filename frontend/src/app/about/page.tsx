import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import { POLICIES, STATEMENTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About AQUOR",
  description:
    "The story of AQUOR — from a single borehole to one of Africa's largest bottled water and hydration companies, serving 54 markets with 12 production facilities.",
  alternates: { canonical: "/about" },
};

const MILESTONES = [
  { year: "1998", event: "First borehole drilled and a single sachet line commissioned in Lagos." },
  { year: "2004", event: "First PET bottling plant opens; NAFDAC and SON certifications secured." },
  { year: "2010", event: "National distribution network reaches all 36 states." },
  { year: "2015", event: "Premium glass line launches for hotels, airlines and fine dining." },
  { year: "2018", event: "AQUOR Water Dredging Foundation established." },
  { year: "2021", event: "First fully robotic plant; SCADA and IoT rollout across all facilities." },
  { year: "2023", event: "Export operations reach 54 markets; rPET programme hits 30%." },
  { year: "2026", event: "Digital ecosystem launches: e-commerce, WhatsApp & Telegram ordering, distributor portals." },
];

const VALUES = [
  { name: "Purity Without Compromise", detail: "Nine stages of purification and 60+ lab checks — because trust is earned per bottle." },
  { name: "Water for Everyone", detail: "From ₦50 sachets to luxury glass: hydration at every price point, everywhere." },
  { name: "Leave Water Better", detail: "We return more to the watershed than we draw, and fund the waterways we all share." },
  { name: "African Excellence, Global Standards", detail: "Built in Africa, certified for the world." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="Our Story"
            title="From one borehole to a continent"
            description="Twenty-eight years of engineering, logistics and stubborn belief that every African deserves world-class water."
          />
        </div>
      </section>

      {/* Vision · Mission · Promise */}
      <section className="section pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass glass-hover h-full rounded-3xl p-10">
              <p className="eyebrow">Our Vision</p>
              <p className="mt-5 font-display text-2xl leading-snug text-white md:text-3xl">
                {STATEMENTS.vision}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass glass-hover h-full rounded-3xl p-10">
              <p className="eyebrow">Our Mission</p>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">{STATEMENTS.mission}</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="mt-6">
          <div className="glass relative overflow-hidden rounded-3xl p-10 text-center md:p-12">
            <div className="absolute inset-0 bg-hero-radial" />
            <div className="relative">
              <p className="eyebrow">Our Promise</p>
              <p className="text-gradient mx-auto mt-4 max-w-3xl font-display text-3xl leading-snug md:text-4xl">
                &ldquo;{STATEMENTS.promise}&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section pb-24">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl p-10 md:grid-cols-4">
          {[
            { value: 14000, suffix: "+", label: "Employees" },
            { value: 28, suffix: "", label: "Years of operation" },
            { value: 8500, suffix: "+", label: "Distribution partners" },
            { value: 54, suffix: "", label: "Markets served" },
          ].map((stat, i) => (
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

      <section className="section pb-24">
        <SectionHeading eyebrow="Milestones" title="The timeline" align="left" />
        <div className="relative mt-12 space-y-8 border-l border-white/10 pl-8">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-aqua-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <p className="font-display text-xl text-aqua-300">{m.year}</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-300">{m.event}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pb-28">
        <SectionHeading eyebrow="What We Stand For" title="Our values" align="left" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.name} delay={(i % 2) * 0.1}>
              <div className="glass glass-hover h-full rounded-2xl p-8">
                <h3 className="font-display text-xl text-white">{v.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{v.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Policy statements */}
      <section className="section pb-28">
        <SectionHeading
          eyebrow="Our Commitments"
          title="The policies we answer to"
          description="Signed by the Managing Director, displayed in every facility, and audited against — these statements govern how AQUOR operates."
          align="left"
        />
        <div className="mt-10 space-y-4">
          {POLICIES.map((policy, i) => (
            <Reveal key={policy.name} delay={i * 0.06}>
              <div className="glass glass-hover rounded-2xl p-8 md:flex md:gap-10">
                <h3 className="font-display text-xl text-white md:w-64 md:shrink-0">
                  {policy.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 md:mt-0">{policy.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 flex flex-wrap justify-center gap-4">
          <Link href="/manufacturing" className="btn-primary">
            See How We Make Water
          </Link>
          <Link href="/certifications" className="btn-ghost">
            Our Certifications
          </Link>
          <Link href="/portals" className="btn-ghost">
            Careers at AQUOR
          </Link>
        </Reveal>
      </section>
    </>
  );
}
