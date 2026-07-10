import Link from "next/link";
import Hero from "@/components/home/Hero";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";
import Bottle from "@/components/Bottle";
import {
  CERTIFICATIONS,
  COMPANY,
  FOUNDATION_STATS,
  HERO_STATS,
  INDUSTRIES,
  PRODUCT_CATEGORIES,
  VALUE_CHAIN,
} from "@/lib/data";

const BOTTLE_ACCENTS: Record<string, [string, string]> = {
  sachet: ["#7DD3FC", "#0369A1"],
  pet: ["#67E8F9", "#0E4D92"],
  dispenser: ["#60A5FA", "#1E3A8A"],
  premium: ["#DBC08A", "#8A6D3B"],
  custom: ["#E879F9", "#0E4D92"],
  specialty: ["#6EE7B7", "#065F46"],
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats strip */}
      <section className="section -mt-6 pb-24">
        <div className="glass grid grid-cols-2 gap-8 rounded-3xl p-8 md:grid-cols-4 md:p-12">
          {HERO_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.12} className="text-center">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-4xl text-white md:text-5xl"
              />
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Value chain journey */}
      <section className="section pb-28">
        <SectionHeading
          eyebrow="The Complete Value Chain"
          title="The journey of a single drop"
          description="From hydrogeological survey to circular recovery — every stage engineered, verified and animated by precision."
        />
        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-aqua-400/60 via-ocean-500/40 to-transparent md:left-1/2 md:block" />
          <div className="space-y-10 md:space-y-0">
            {VALUE_CHAIN.map((stage, i) => (
              <Reveal
                key={stage.phase}
                delay={0.05}
                className={`relative md:flex md:py-8 ${i % 2 ? "md:justify-start" : "md:justify-end"}`}
              >
                <div className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua-300 shadow-[0_0_16px_rgba(103,232,249,0.8)] md:block" />
                <div
                  className={`glass glass-hover w-full rounded-2xl p-8 md:w-[calc(50%-3rem)] ${i % 2 ? "" : ""}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-gradient font-display text-3xl">{stage.phase}</span>
                    <h3 className="font-display text-2xl text-white">{stage.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{stage.description}</p>
                  <ul className="mt-5 grid grid-cols-2 gap-2">
                    {stage.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-1 w-1 rounded-full bg-aqua-300" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="relative pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-600/5 to-transparent" />
        <div className="section relative">
          <SectionHeading
            eyebrow="Every Category. Every Occasion."
            title="A product for every hand"
            description="Six complete product families — from everyday sachets to luxury glass poured in business class."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((cat, i) => {
              const [from, to] = BOTTLE_ACCENTS[cat.id];
              return (
                <Reveal key={cat.id} delay={(i % 3) * 0.12}>
                  <Link
                    href={`/products#${cat.id}`}
                    className="glass glass-hover group relative block overflow-hidden rounded-3xl p-8"
                  >
                    <div className="absolute -right-8 -top-4 opacity-25 transition-all duration-700 group-hover:-translate-y-2 group-hover:opacity-50">
                      <Bottle className="h-52" accentFrom={from} accentTo={to} />
                    </div>
                    <p
                      className={`inline-block rounded-full bg-gradient-to-r ${cat.accent} bg-clip-text text-xs font-bold uppercase tracking-[0.2em] text-transparent`}
                    >
                      {cat.tag}
                    </p>
                    <h3 className="mt-3 font-display text-2xl text-white">{cat.name}</h3>
                    <p className="mt-3 max-w-[85%] text-sm leading-relaxed text-slate-400">
                      {cat.description}
                    </p>
                    <p className="mt-6 text-sm font-semibold text-aqua-300 transition-transform duration-300 group-hover:translate-x-1.5">
                      Discover →
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Manufacturing teaser */}
      <section className="section pb-28">
        <div className="glass relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/20 via-transparent to-aqua-400/10" />
          <div className="relative grid gap-12 p-10 md:p-16 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">The Digital Factory</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-white md:text-5xl">
                81,000 bottles an hour.
                <br />
                <span className="text-gradient">Zero compromise.</span>
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-slate-400">
                Robotic filling lines, SCADA-monitored purification, IoT sensors on every machine
                and predictive maintenance powered by machine learning. Step inside a bottling
                plant built for the next century.
              </p>
              <Link href="/manufacturing" className="btn-primary mt-8">
                Tour the Plant
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <Reveal delay={0.2} className="grid grid-cols-2 gap-4">
              {[
                { value: 9, suffix: "", label: "Purification stages" },
                { value: 60, suffix: "+", label: "Lab parameters per batch" },
                { value: 99.98, suffix: "%", label: "Fill accuracy" },
                { value: 24, suffix: "/7", label: "SCADA monitoring" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-6 text-center">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="font-display text-3xl text-aqua-300"
                  />
                  <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Industries marquee */}
      <section className="pb-28">
        <div className="section">
          <SectionHeading
            eyebrow="Industries Served"
            title="Trusted by every sector"
            description="From five-star hotels to field hospitals, national airlines to neighbourhood retailers."
          />
        </div>
        <div className="mt-14 space-y-5">
          <Marquee duration={45}>
            {INDUSTRIES.slice(0, 8).map((ind) => (
              <div
                key={ind.name}
                className="glass flex items-center gap-3 rounded-full px-7 py-3.5 text-sm text-slate-200"
              >
                <span aria-hidden>{ind.icon}</span>
                {ind.name}
              </div>
            ))}
          </Marquee>
          <Marquee duration={38}>
            {INDUSTRIES.slice(8).map((ind) => (
              <div
                key={ind.name}
                className="glass flex items-center gap-3 rounded-full px-7 py-3.5 text-sm text-slate-200"
              >
                <span aria-hidden>{ind.icon}</span>
                {ind.name}
              </div>
            ))}
          </Marquee>
        </div>
        <div className="section mt-10 text-center">
          <Link href="/industries" className="btn-ghost">
            Explore Industry Solutions
          </Link>
        </div>
      </section>

      {/* AQUOR Flow teaser */}
      <section className="section pb-28">
        <Reveal>
          <Link
            href="/water-supply"
            className="glass glass-hover group relative block overflow-hidden rounded-3xl p-10 md:p-14"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-600/25 via-transparent to-aqua-400/10" />
            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="eyebrow">New — AQUOR Flow</p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-4xl">
                  Metered water supply, <span className="text-gradient">straight to your taps</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
                  Smart-metered piped water for households and estates: prepaid tokens on WhatsApp,
                  tiered fair tariffs, leak alerts, and the same nine-stage purity — 68,000+
                  households already connected.
                </p>
              </div>
              <span className="btn-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                Explore AQUOR Flow <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Foundation / impact */}
      <section className="relative pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
        <div className="section relative">
          <SectionHeading
            eyebrow="AQUOR Water Dredging Foundation"
            title="We give back more than we take"
            description="Dredging rivers, drilling boreholes, restoring wetlands and bringing clean water to millions — measured, audited and published."
          />
          <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
            {FOUNDATION_STATS.slice(0, 8).map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 4) * 0.1}>
                <div className="glass glass-hover h-full rounded-2xl p-6 text-center">
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
          <Reveal className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/foundation" className="btn-primary">
              Visit the Foundation
            </Link>
            <Link href="/sustainability" className="btn-ghost">
              Sustainability Hub
            </Link>
            <Link href="/esg" className="btn-ghost">
              ESG Portal
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Certifications */}
      <section className="pb-28">
        <div className="section">
          <SectionHeading
            eyebrow="Certified Excellence"
            title="Audited. Certified. Verified."
          />
        </div>
        <div className="mt-12">
          <Marquee duration={50}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.code} className="glass w-56 shrink-0 rounded-2xl p-6 text-center">
                <p className="font-display text-xl text-gold-400">{cert.code}</p>
                <p className="mt-2 text-xs text-slate-400">{cert.name}</p>
              </div>
            ))}
          </Marquee>
        </div>
        <div className="section mt-10 text-center">
          <Link
            href="/certifications"
            className="text-sm font-semibold text-aqua-300 hover:underline"
          >
            View &amp; verify all certificates →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section pb-28">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-12 text-center md:p-20">
            <div className="absolute inset-0 bg-hero-radial" />
            <div className="relative">
              <h2 className="font-display text-4xl text-white md:text-6xl">
                Thirsty for <span className="text-gradient">excellence?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-slate-400">
                Order in seconds on WhatsApp or Telegram, subscribe to a delivery plan, or become a
                distributor in one of the fastest-growing beverage networks in Africa.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace("+", "")}?text=Hello%20AQUOR%2C%20I%27d%20like%20to%20order%20water.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Order on WhatsApp
                </a>
                <a
                  href={`https://t.me/${COMPANY.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Telegram Bot
                </a>
                <Link href="/portals" className="btn-ghost">
                  Become a Distributor
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
