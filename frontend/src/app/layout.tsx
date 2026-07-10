import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/data";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} — ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: [
    "bottled water",
    "premium water",
    "sachet water",
    "dispenser water",
    "customized water bottles",
    "alkaline water",
    "water manufacturer Africa",
    "water delivery",
  ],
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description: COMPANY.description,
    url: COMPANY.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description: COMPANY.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#040B16",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  alternateName: COMPANY.name,
  url: COMPANY.url,
  description: COMPANY.description,
  slogan: COMPANY.tagline,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Wellspring Boulevard, Victoria Island",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [
    "https://www.linkedin.com/company/aquor",
    "https://www.instagram.com/aquor",
    "https://twitter.com/aquor",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
