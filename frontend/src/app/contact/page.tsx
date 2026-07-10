import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & Ordering",
  description:
    "Order AQUOR water via WhatsApp or Telegram, request quotations, book custom bottle projects, or reach our sales, support and export teams.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    name: "WhatsApp Ordering",
    detail: "Order water, request quotes, track deliveries and get support — our AI assistant replies in seconds, humans join when needed.",
    action: "Chat on WhatsApp",
    href: `https://wa.me/${COMPANY.whatsapp.replace("+", "")}?text=Hello%20AQUOR!`,
    accent: "text-emerald-300",
  },
  {
    name: "Telegram Bot",
    detail: "Browse the catalog, place orders, register as a distributor and receive delivery notifications from @aquor_bot.",
    action: "Open Telegram",
    href: `https://t.me/${COMPANY.telegram}`,
    accent: "text-sky-300",
  },
  {
    name: "Call Center",
    detail: "Speak to sales, distribution or customer care — 7 days a week, 6am to 10pm WAT.",
    action: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
    accent: "text-aqua-300",
  },
  {
    name: "Email",
    detail: "Corporate accounts, export enquiries, press and partnership requests.",
    action: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    accent: "text-gold-400",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I order AQUOR water?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Order via WhatsApp, Telegram, the online store, or by calling our call center. Bulk and corporate orders can also be placed through the distributor and customer portals.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get customized water bottles for my event?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AQUOR produces custom-branded bottles for weddings, conferences, corporate events, campaigns and more, with QR personalization and photo printing. Minimum order quantities apply.",
      },
    },
    {
      "@type": "Question",
      name: "How do I become an AQUOR distributor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Register through the distributor portal or via WhatsApp. Our team verifies your coverage area and logistics capacity, then onboards you with wholesale pricing and route support.",
      },
    },
    {
      "@type": "Question",
      name: "Does AQUOR supply piped water to homes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AQUOR Flow supplies metered piped water to households, estates and institutions using ultrasonic smart meters. Customers choose prepaid water tokens (vended via WhatsApp, Telegram, app or agents) or postpaid monthly billing on tiered tariffs.",
      },
    },
    {
      "@type": "Question",
      name: "Does AQUOR deliver dispenser water to homes and offices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. 18.9L dispenser bottles are available on refill and exchange programmes with scheduled home and office delivery through subscription plans.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="relative overflow-hidden pb-20 pt-40">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="section relative">
          <SectionHeading
            eyebrow="Contact & Ordering"
            title="Water is one message away"
            description="Pick a channel — our AI assistants and human teams handle orders, quotes, custom projects and support around the clock."
          />
        </div>
      </section>

      <section className="section pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {CHANNELS.map((ch, i) => (
            <Reveal key={ch.name} delay={(i % 2) * 0.1}>
              <a
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass glass-hover block h-full rounded-3xl p-9"
              >
                <h3 className={`font-display text-2xl ${ch.accent}`}>{ch.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{ch.detail}</p>
                <p className={`mt-6 text-sm font-bold ${ch.accent}`}>{ch.action} →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pb-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow="Write to Us" title="Request a quotation" align="left" />
            <div className="mt-8 space-y-4 text-sm text-slate-400">
              <p>
                <span className="font-semibold text-white">Head Office:</span>
                <br />
                {COMPANY.address}
              </p>
              <p>
                <span className="font-semibold text-white">Hours:</span>
                <br />
                Monday – Saturday, 6:00 – 22:00 WAT
              </p>
              <p>
                <span className="font-semibold text-white">Export Desk:</span>
                <br />
                export@aquor.com
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <form className="glass space-y-4 rounded-3xl p-8" action="#" method="post">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="glass w-full rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-aqua-300/50 focus:outline-none"
                  placeholder="Full name"
                  name="name"
                  aria-label="Full name"
                  required
                />
                <input
                  className="glass w-full rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-aqua-300/50 focus:outline-none"
                  placeholder="Email or phone"
                  name="contact"
                  aria-label="Email or phone"
                  required
                />
              </div>
              <select
                className="glass w-full rounded-xl bg-navy-950 px-5 py-3.5 text-sm text-slate-300 focus:border-aqua-300/50 focus:outline-none"
                name="topic"
                aria-label="Enquiry type"
                defaultValue="Bulk order"
              >
                <option>Bulk order</option>
                <option>Custom-branded bottles</option>
                <option>Distributor registration</option>
                <option>Dispenser subscription</option>
                <option>Export enquiry</option>
                <option>Foundation partnership</option>
                <option>Other</option>
              </select>
              <textarea
                className="glass min-h-32 w-full rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-aqua-300/50 focus:outline-none"
                placeholder="Tell us what you need — quantities, sizes, dates, delivery location…"
                name="message"
                aria-label="Message"
                required
              />
              <button type="submit" className="btn-primary w-full justify-center">
                Send Request
              </button>
              <p className="text-center text-xs text-slate-600">
                Demo form — production submissions route to the CRM with SLA-tracked follow-up.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
