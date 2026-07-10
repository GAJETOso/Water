import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { INDUSTRIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries Served",
  description:
    "AQUOR supplies hotels, restaurants, hospitals, schools, airlines, government, oil & gas, NGOs, event planners, retail chains, the military and export markets.",
  alternates: { canonical: "/industries" },
};

const SOLUTIONS: Record<string, string> = {
  "Hotels & Resorts": "Branded in-room bottles, minibar formats, banquet supply and glass premium lines.",
  Restaurants: "Table water programmes — still and sparkling — with custom-label options.",
  Hospitals: "Medical-grade hydration, dispenser networks and emergency supply contracts.",
  "Schools & Universities": "Safe hydration programmes, dispenser refills and graduation-branded bottles.",
  "Airlines & Airports": "Lightweight cabin bottles, business-class glass and lounge supply.",
  Government: "Bulk framework contracts, event supply and emergency-relief logistics.",
  "Oil & Gas": "Camp and offshore supply with rugged bulk formats and scheduled logistics.",
  Construction: "Site hydration at scale — sachets, bulk PET and dispenser stations.",
  Factories: "Workforce hydration programmes with vending and dispenser integration.",
  NGOs: "Relief water, campaign-branded bottles and last-mile distribution partnerships.",
  "Churches & Mosques": "Event and congregation supply with custom spiritual-occasion branding.",
  "Event Planners": "Weddings to festivals: custom labels, QR personalization and chilled logistics.",
  "Retail Chains": "Full-range shelf programmes, promotional packs and private-label bottling.",
  "Military & Defence": "Field-ready packaging, long-shelf-life formats and secure supply chains.",
  "Export Markets": "Certified export documentation, containerised shipping and multi-market compliance.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="Industries Served"
            title="One supplier. Every sector."
            description="Dedicated account teams, sector-specific formats and service-level agreements built around how your industry actually works."
          />
        </div>
      </section>

      <section className="section pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 0.08}>
              <div className="glass glass-hover h-full rounded-2xl p-7">
                <span className="text-3xl" aria-hidden>
                  {ind.icon}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {SOLUTIONS[ind.name]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 text-center">
          <Link href="/contact" className="btn-primary">
            Discuss Your Sector
          </Link>
        </Reveal>
      </section>
    </>
  );
}
