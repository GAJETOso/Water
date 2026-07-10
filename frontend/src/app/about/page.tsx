import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";

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
        <Reveal className="mt-14 flex flex-wrap justify-center gap-4">
          <Link href="/manufacturing" className="btn-primary">
            See How We Make Water
          </Link>
          <Link href="/portals" className="btn-ghost">
            Careers at AQUOR
          </Link>
        </Reveal>
      </section>
    </>
  );
}
