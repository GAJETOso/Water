import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { CERTIFICATIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Certifications & Verification",
  description:
    "AQUOR's certifications: ISO 9001, ISO 22000, ISO 14001, ISO 17025, FSSC 22000, HACCP, NAFDAC, SON, WHO GMP and export certifications — with a public verification portal.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="Quality & Compliance"
            title="Certified at every level"
            description="Every plant, every line, every batch — audited by national regulators and international certification bodies."
          />
        </div>
      </section>

      <section className="section pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.code} delay={(i % 3) * 0.08}>
              <div className="glass glass-hover flex h-full flex-col rounded-2xl p-7">
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl text-gold-400">{cert.code}</p>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Active
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-slate-400">{cert.name}</p>
                <div className="mt-5 flex gap-3 border-t border-white/10 pt-4 text-xs">
                  <span className="cursor-not-allowed font-semibold text-aqua-300/70" title="Available at launch">
                    Download PDF
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="cursor-not-allowed font-semibold text-aqua-300/70" title="Available at launch">
                    Verify Online
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pb-28">
        <Reveal>
          <div className="glass rounded-3xl p-10 md:p-14">
            <h2 className="font-display text-2xl text-white md:text-3xl">Verification portal</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
              Every certificate carries a unique verification code. Enter it below — or scan the QR
              code printed on the document — to confirm authenticity directly against our registry.
            </p>
            <form className="mt-7 flex max-w-lg flex-col gap-3 sm:flex-row" action="#" method="get">
              <input
                type="text"
                name="code"
                placeholder="e.g. AQR-ISO9001-2025-0042"
                className="glass flex-1 rounded-full px-6 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-aqua-300/50 focus:outline-none"
                aria-label="Certificate verification code"
              />
              <button type="submit" className="btn-primary justify-center">
                Verify
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-600">
              Demo form — verification is served by the certificates API in production.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
