import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Counter from "@/components/Counter";
import LiveDashboard from "@/components/manufacturing/LiveDashboard";

export const metadata: Metadata = {
  title: "Manufacturing — The Digital Factory",
  description:
    "Inside AQUOR's bottling plants: nine-stage purification, robotic filling at 81,000 bottles per hour, SCADA monitoring, IoT sensors and predictive maintenance.",
  alternates: { canonical: "/manufacturing" },
};

const STAGES = [
  {
    step: "01",
    title: "Water Treatment Train",
    detail:
      "Raw water from protected boreholes passes through multimedia filtration, activated carbon, water softening, reverse osmosis, UV sterilization and ozonation before precision remineralisation.",
    metric: { value: 9, suffix: "", label: "treatment stages" },
  },
  {
    step: "02",
    title: "In-house Bottle Blowing",
    detail:
      "PET preforms are heated and stretch-blown into bottles seconds before filling — eliminating transport contamination and cutting resin waste by 18%.",
    metric: { value: 24000, suffix: "", label: "bottles blown / hr / machine" },
  },
  {
    step: "03",
    title: "Robotic Rinse–Fill–Cap",
    detail:
      "Rotary monoblocks rinse, fill and cap in a Class-100 clean room. Servo-driven filling valves hit gram-level accuracy on every bottle.",
    metric: { value: 99.98, suffix: "%", label: "fill accuracy" },
  },
  {
    step: "04",
    title: "Inspection & Coding",
    detail:
      "High-speed vision systems inspect fill level, cap torque and label placement, while laser coders print batch, date and traceability data.",
    metric: { value: 100, suffix: "%", label: "bottles inspected" },
  },
  {
    step: "05",
    title: "Laboratory Verification",
    detail:
      "ISO 17025 laboratories test every batch across 60+ physical, chemical and microbiological parameters. Nothing ships until the lab signs off.",
    metric: { value: 60, suffix: "+", label: "parameters per batch" },
  },
  {
    step: "06",
    title: "Robotic Packaging & Palletising",
    detail:
      "Shrink-wrappers, case packers and robotic palletisers prepare product for smart warehouses with automated cold storage and FEFO inventory rotation.",
    metric: { value: 4200, suffix: "", label: "pallets / day" },
  },
];

const TECH = [
  { name: "SCADA Overview", detail: "Plant-wide supervisory control with real-time alarming and historian." },
  { name: "IoT Sensor Mesh", detail: "3,400+ sensors streaming temperature, pressure, flow and vibration." },
  { name: "Predictive Maintenance", detail: "ML models forecast bearing and seal failures 2–3 weeks ahead." },
  { name: "Digital Twin", detail: "A live simulation of every line for what-if planning and training." },
  { name: "MES Integration", detail: "Batch genealogy and OEE flowing straight into the ERP." },
  { name: "Energy Analytics", detail: "Per-line energy dashboards driving our 100% renewables roadmap." },
];

export default function ManufacturingPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="The Digital Factory"
            title="Where water meets precision robotics"
            description="Twelve facilities. Fully automated lines. Every machine monitored, every batch verified, every drop traceable."
          />
        </div>
      </section>

      <section className="section pb-24">
        <LiveDashboard />
      </section>

      <section className="section pb-24">
        <SectionHeading
          eyebrow="Production Journey"
          title="Follow the line"
          description="Six automated stages between the aquifer and the pallet."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.step} delay={(i % 3) * 0.12}>
              <div className="glass glass-hover flex h-full flex-col rounded-3xl p-8">
                <span className="text-gradient font-display text-4xl">{stage.step}</span>
                <h3 className="mt-4 font-display text-xl text-white">{stage.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{stage.detail}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <Counter
                    value={stage.metric.value}
                    suffix={stage.metric.suffix}
                    className="font-display text-2xl text-aqua-300"
                  />
                  <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                    {stage.metric.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pb-28">
        <SectionHeading
          eyebrow="Industry 4.0"
          title="A factory that thinks"
          description="Connected, instrumented and self-optimising."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TECH.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.1}>
              <div className="glass glass-hover h-full rounded-2xl p-7">
                <h3 className="text-base font-semibold text-white">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Link href="/contact" className="btn-primary">
            Book a Plant Tour
          </Link>
        </Reveal>
      </section>
    </>
  );
}
