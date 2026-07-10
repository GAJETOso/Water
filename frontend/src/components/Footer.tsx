import Link from "next/link";
import { COMPANY } from "@/lib/data";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Sachet Water", href: "/products#sachet" },
      { label: "PET Bottled Water", href: "/products#pet" },
      { label: "Dispenser Water", href: "/products#dispenser" },
      { label: "Premium & Glass", href: "/products#premium" },
      { label: "Customized Bottles", href: "/products#custom" },
      { label: "Specialty Hydration", href: "/products#specialty" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About AQUOR", href: "/about" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Industries Served", href: "/industries" },
      { label: "Certifications", href: "/certifications" },
      { label: "Contact & Ordering", href: "/contact" },
    ],
  },
  {
    title: "Impact",
    links: [
      { label: "Sustainability", href: "/sustainability" },
      { label: "Water Dredging Foundation", href: "/foundation" },
      { label: "ESG Portal", href: "/esg" },
    ],
  },
  {
    title: "Portals",
    links: [
      { label: "Distributor Portal", href: "/portals" },
      { label: "Customer Portal", href: "/portals" },
      { label: "Supplier Portal", href: "/portals" },
      { label: "Investor Relations", href: "/portals" },
      { label: "Careers", href: "/portals" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-900/60">
      <div className="section grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="text-lg font-bold tracking-[0.25em] text-white">AQUOR</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            {COMPANY.tagline} Purified at the source, bottled with precision, delivered across
            Africa and beyond.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${COMPANY.whatsapp.replace("+", "")}?text=Hello%20AQUOR%2C%20I%27d%20like%20to%20order%20water.`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover rounded-full px-4 py-2 text-xs font-semibold text-emerald-300"
            >
              WhatsApp Ordering
            </a>
            <a
              href={`https://t.me/${COMPANY.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover rounded-full px-4 py-2 text-xs font-semibold text-sky-300"
            >
              Telegram Bot
            </a>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-aqua-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="section flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p>{COMPANY.address}</p>
        </div>
      </div>
    </footer>
  );
}
