import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Bottle from "@/components/Bottle";
import { COMPANY, PRODUCT_CATEGORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Every category of packaged drinking water: sachet, PET bottles from 330ml to 18.9L, dispenser refills, premium glass, customized bottles and specialty hydration.",
  alternates: { canonical: "/products" },
};

const PET_SIZES = ["330ml", "500ml", "600ml", "750ml", "1L", "1.5L", "2L", "5L", "10L", "18.9L"];

const CUSTOM_OCCASIONS = [
  "Weddings",
  "Birthdays",
  "Funerals & memorials",
  "Conferences & summits",
  "Church & mosque events",
  "Political campaigns",
  "Graduations & convocations",
  "Product launches",
  "Award ceremonies",
  "Trade fairs",
  "Sports tournaments",
  "Concerts & festivals",
  "NGO & awareness campaigns",
  "Fundraisers",
  "Government events",
  "Corporate gifting",
];

const ACCENTS: Record<string, [string, string]> = {
  sachet: ["#7DD3FC", "#0369A1"],
  pet: ["#67E8F9", "#0E4D92"],
  dispenser: ["#60A5FA", "#1E3A8A"],
  premium: ["#DBC08A", "#8A6D3B"],
  custom: ["#E879F9", "#0E4D92"],
  specialty: ["#6EE7B7", "#065F46"],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AQUOR Product Categories",
  itemListElement: PRODUCT_CATEGORIES.map((cat, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: `AQUOR ${cat.name}`,
      description: cat.description,
      brand: { "@type": "Brand", name: "AQUOR" },
    },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="The Complete Portfolio"
            title="Water, in every form it's needed"
            description="Six product families, dozens of formats, unlimited customization — all purified through the same nine-stage process."
          />
        </div>
      </section>

      <div className="space-y-24 pb-28">
        {PRODUCT_CATEGORIES.map((cat, i) => {
          const [from, to] = ACCENTS[cat.id];
          return (
            <section key={cat.id} id={cat.id} className="section scroll-mt-24">
              <div
                className={`glass relative overflow-hidden rounded-3xl p-10 md:p-14 lg:flex lg:items-center lg:gap-14 ${
                  i % 2 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <Reveal className="relative mx-auto mb-10 w-40 shrink-0 lg:mb-0 lg:w-52">
                  <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-aqua-400/10 blur-3xl" />
                  <div className="animate-float-slow">
                    <Bottle className="w-full" accentFrom={from} accentTo={to} />
                  </div>
                </Reveal>
                <div className="flex-1">
                  <Reveal>
                    <p
                      className={`inline-block bg-gradient-to-r ${cat.accent} bg-clip-text text-xs font-bold uppercase tracking-[0.25em] text-transparent`}
                    >
                      {cat.tag}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">{cat.name}</h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">{cat.description}</p>
                  </Reveal>
                  <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-2.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="glass rounded-full px-4 py-2 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </Reveal>

                  {cat.id === "pet" && (
                    <Reveal delay={0.25} className="mt-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Available sizes
                      </p>
                      <div className="mt-3 flex flex-wrap items-end gap-3">
                        {PET_SIZES.map((size, idx) => (
                          <div key={size} className="flex flex-col items-center gap-2">
                            <div
                              className="w-5 rounded-t-full rounded-b-md bg-gradient-to-b from-aqua-300/70 to-ocean-600/70"
                              style={{ height: `${22 + idx * 7}px` }}
                            />
                            <span className="text-[10px] text-slate-400">{size}</span>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  )}

                  {cat.id === "custom" && (
                    <Reveal delay={0.25} className="mt-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Occasions we bottle for
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {CUSTOM_OCCASIONS.map((o) => (
                          <span key={o} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-slate-300">
                            {o}
                          </span>
                        ))}
                      </div>
                    </Reveal>
                  )}

                  <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-4">
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp.replace("+", "")}?text=Hello%20AQUOR%2C%20I%27d%20like%20a%20quote%20for%20${encodeURIComponent(cat.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-3 text-xs"
                    >
                      Request a Quote
                    </a>
                    <Link href="/contact" className="btn-ghost !py-3 text-xs">
                      Talk to Sales
                    </Link>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
