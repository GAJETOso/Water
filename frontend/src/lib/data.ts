export const COMPANY = {
  name: "AQUOR",
  legalName: "AQUOR Beverages PLC",
  tagline: "Africa's Water, Perfected.",
  description:
    "AQUOR is one of Africa's largest bottled water and hydration companies — purifying, bottling and delivering premium water across retail, hospitality, aviation, healthcare and export markets.",
  phone: "+234 800 000 0000",
  whatsapp: "+2348000000000",
  telegram: "aquor_bot",
  email: "hello@aquor.com",
  address: "1 Wellspring Boulevard, Victoria Island, Lagos, Nigeria",
  url: "https://www.aquor.com",
};

export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Water Supply", href: "/water-supply" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Industries", href: "/industries" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Foundation", href: "/foundation" },
  { label: "ESG", href: "/esg" },
  { label: "About", href: "/about" },
];

export const HERO_STATS = [
  { value: 2.4, suffix: "B+", label: "Bottles produced yearly" },
  { value: 54, suffix: "", label: "Markets served" },
  { value: 12, suffix: "", label: "Production facilities" },
  { value: 98.7, suffix: "%", label: "Bottle recovery target" },
];

export type ProductCategory = {
  id: string;
  name: string;
  tag: string;
  description: string;
  items: string[];
  accent: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "sachet",
    name: "Sachet Water",
    tag: "Everyday Hydration",
    description:
      "Ultra-affordable, rigorously purified sachet water in multiple sizes, bulk packs and wholesale volumes — with custom branding for partners.",
    items: ["50cl sachets", "60cl sachets", "Bulk bales", "Wholesale pallets", "Retail packs", "Custom-branded sachets"],
    accent: "from-sky-400 to-cyan-300",
  },
  {
    id: "pet",
    name: "PET Bottled Water",
    tag: "The Full Range",
    description:
      "Every format from pocket-size to family: 330ml, 500ml, 600ml, 750ml, 1L, 1.5L, 2L, 5L, 10L and 18.9L — plus sports, kids, travel, hotel and corporate editions.",
    items: ["330ml – 2L retail", "5L / 10L family", "18.9L dispenser", "Sports & kids bottles", "Hotel & corporate bottles", "Travel formats"],
    accent: "from-ocean-400 to-aqua-300",
  },
  {
    id: "dispenser",
    name: "Dispenser Water",
    tag: "Home & Office",
    description:
      "18.9L refill and exchange programmes with scheduled home delivery, office delivery and industrial supply — managed through our subscription platform.",
    items: ["Refill programme", "Bottle exchange", "Home delivery", "Office delivery", "Industrial supply", "Subscription plans"],
    accent: "from-blue-500 to-sky-300",
  },
  {
    id: "premium",
    name: "Premium & Glass",
    tag: "Luxury Collection",
    description:
      "Still and sparkling water in artisan glass, crafted for luxury hotels, fine dining, VIP events, airline business class, private jets and executive boardrooms.",
    items: ["Artisan glass bottles", "Luxury hotels & fine dining", "VIP events", "Airlines & private jets", "Executive meetings", "Limited editions"],
    accent: "from-gold-400 to-amber-200",
  },
  {
    id: "custom",
    name: "Customized Bottles",
    tag: "Your Brand, Our Water",
    description:
      "Full-wrap branded bottles for weddings, corporate events, conferences, campaigns, graduations, concerts and more — with QR personalization, photo printing and variable data.",
    items: ["Corporate branding", "Weddings & celebrations", "Conferences & summits", "Campaigns & causes", "QR & photo personalization", "Luxury packaging"],
    accent: "from-fuchsia-400 to-aqua-300",
  },
  {
    id: "specialty",
    name: "Specialty Hydration",
    tag: "Functional Water",
    description:
      "Science-backed hydration: alkaline, mineral, spring, electrolyte, vitamin, sparkling, flavored and infused waters — plus sports, children's and medical hydration lines.",
    items: ["Alkaline & mineral", "Spring & purified", "Electrolyte & vitamin", "Sparkling & flavored", "Sports hydration", "Medical & pediatric"],
    accent: "from-emerald-400 to-aqua-300",
  },
];

export const VALUE_CHAIN = [
  {
    phase: "01",
    title: "Source",
    description:
      "Hydrogeological surveys locate protected aquifers and natural springs. Deep boreholes extract pristine water, monitored continuously for purity.",
    points: ["Hydrogeological surveys", "Protected aquifers", "Deep boreholes", "Natural springs"],
  },
  {
    phase: "02",
    title: "Purify",
    description:
      "A nine-stage treatment train — multimedia filtration, activated carbon, reverse osmosis, UV sterilization, ozonation and precision mineral balancing.",
    points: ["Multimedia filtration", "Reverse osmosis", "UV + ozonation", "Mineral balancing"],
  },
  {
    phase: "03",
    title: "Bottle",
    description:
      "In-house preform blowing, cap manufacturing and label printing feed fully robotic wash–fill–seal lines running 81,000 bottles per hour.",
    points: ["In-house bottle blowing", "Robotic filling", "Laser coding", "Vision inspection"],
  },
  {
    phase: "04",
    title: "Verify",
    description:
      "ISO 17025 laboratories test every batch across 60+ physical, chemical and microbiological parameters before a single pallet leaves the plant.",
    points: ["ISO 17025 labs", "60+ parameters", "Batch traceability", "NAFDAC / SON compliance"],
  },
  {
    phase: "05",
    title: "Deliver",
    description:
      "Smart warehousing, cold storage and a GPS-tracked fleet move product to distributors, wholesalers, retailers and doorsteps across 54 markets.",
    points: ["Smart warehousing", "GPS-tracked fleet", "Distributor network", "Last-mile delivery"],
  },
  {
    phase: "06",
    title: "Renew",
    description:
      "Bottle recovery, plastic buyback and food-grade recycling close the loop — feeding our circular economy and funding waterway restoration.",
    points: ["Bottle recovery", "Plastic buyback", "rPET recycling", "Circular economy"],
  },
];

export const INDUSTRIES = [
  { name: "Hotels & Resorts", icon: "🏨" },
  { name: "Restaurants", icon: "🍽️" },
  { name: "Hospitals", icon: "🏥" },
  { name: "Schools & Universities", icon: "🎓" },
  { name: "Airlines & Airports", icon: "✈️" },
  { name: "Government", icon: "🏛️" },
  { name: "Oil & Gas", icon: "🛢️" },
  { name: "Construction", icon: "🏗️" },
  { name: "Factories", icon: "🏭" },
  { name: "NGOs", icon: "🤝" },
  { name: "Churches & Mosques", icon: "🕊️" },
  { name: "Event Planners", icon: "🎪" },
  { name: "Retail Chains", icon: "🛒" },
  { name: "Military & Defence", icon: "🛡️" },
  { name: "Export Markets", icon: "🌍" },
];

export const FOUNDATION_STATS = [
  { value: 1840, suffix: " km", label: "Waterways dredged & restored" },
  { value: 620, suffix: "+", label: "Communities served" },
  { value: 1275, suffix: "", label: "Boreholes installed & rehabilitated" },
  { value: 4.8, suffix: "M", label: "People with improved water access" },
  { value: 96, suffix: "", label: "Flood-prone areas restored" },
  { value: 38000, suffix: "+", label: "Volunteers engaged" },
  { value: 12400, suffix: " t", label: "Plastic removed from waterways" },
  { value: 41, suffix: "%", label: "Avg. water-quality improvement" },
];

export const FOUNDATION_PROGRAMS = [
  {
    title: "Dredging & Flood Prevention",
    description:
      "River and canal dredging, community desilting and waterway restoration that improve flow and protect flood-prone communities.",
  },
  {
    title: "Clean Water Access",
    description:
      "Borehole drilling and rehabilitation, community purification systems, rural water schemes and school water infrastructure.",
  },
  {
    title: "Sanitation & Hygiene",
    description:
      "Public sanitation facilities, hygiene education campaigns and flood-prevention awareness programmes in partnership with local governments.",
  },
  {
    title: "Ecosystem Protection",
    description:
      "Wetland restoration, watershed conservation, aquatic ecosystem protection and continuous water-quality monitoring.",
  },
];

export const ESG_KPIS = [
  { value: 62, suffix: "%", label: "rPET content by 2030", now: "34% today" },
  { value: 100, suffix: "%", label: "Renewable electricity by 2032", now: "47% today" },
  { value: 1.42, suffix: "L/L", label: "Water-use ratio", now: "Industry-leading efficiency" },
  { value: 0, suffix: "", label: "Net Zero by 2045", now: "SBTi-aligned roadmap" },
];

export const CERTIFICATIONS = [
  { code: "ISO 9001", name: "Quality Management" },
  { code: "ISO 22000", name: "Food Safety Management" },
  { code: "ISO 14001", name: "Environmental Management" },
  { code: "ISO 17025", name: "Laboratory Competence" },
  { code: "FSSC 22000", name: "Food Safety System Certification" },
  { code: "HACCP", name: "Hazard Analysis & Critical Control" },
  { code: "NAFDAC", name: "National Regulatory Approval" },
  { code: "SON", name: "Standards Organisation Compliance" },
  { code: "WHO GMP", name: "Good Manufacturing Practice" },
  { code: "Export Cert.", name: "International Export Certification" },
];

export const SUPPLY_STATS = [
  { value: 68000, suffix: "+", label: "Households connected" },
  { value: 410, suffix: "", label: "Estates & communities served" },
  { value: 52000, suffix: "+", label: "Smart meters deployed" },
  { value: 99.2, suffix: "%", label: "Supply uptime (12-mo avg.)" },
];

export const SUPPLY_STEPS = [
  {
    step: "01",
    title: "Apply",
    detail:
      "Apply online, on WhatsApp or at a service centre — as a single household, a landlord or an estate manager.",
  },
  {
    step: "02",
    title: "Survey",
    detail:
      "Our engineers survey your location within 48 hours and confirm network coverage, pressure zone and connection cost.",
  },
  {
    step: "03",
    title: "Connect & meter",
    detail:
      "We lay the service line and install an ultrasonic smart meter — prepaid or postpaid, your choice.",
  },
  {
    step: "04",
    title: "Top up & flow",
    detail:
      "Buy water tokens on WhatsApp, Telegram or the app in seconds; postpaid customers get itemised monthly e-bills.",
  },
];

export const METER_FEATURES = [
  {
    name: "Ultrasonic Smart Meters",
    detail: "No moving parts, ±1% accuracy for life, NB-IoT telemetry every 15 minutes.",
  },
  {
    name: "Prepaid Water Tokens",
    detail: "STS-compatible 20-digit tokens vended via WhatsApp, Telegram, app, USSD or agents.",
  },
  {
    name: "Leak & Tamper Alerts",
    detail: "Continuous-flow detection flags leaks within hours; tamper events alert both you and us.",
  },
  {
    name: "Tiered Fair Tariffs",
    detail: "A subsidised lifeline band for essential use, rising gently with consumption.",
  },
  {
    name: "Estate Bulk Metering",
    detail: "Master meters with per-unit sub-metering, landlord dashboards and automated reconciliation.",
  },
  {
    name: "Quality at the Tap",
    detail: "The same nine-stage purified water — chlorine-residual monitored across the network 24/7.",
  },
];

export const TARIFF_TIERS = [
  { name: "Lifeline", range: "0 – 6 m³ / month", rate: 280, note: "Subsidised essential use" },
  { name: "Standard", range: "6 – 20 m³ / month", rate: 350, note: "Typical family home" },
  { name: "Comfort", range: "20 – 50 m³ / month", rate: 420, note: "Large homes & gardens" },
  { name: "Commercial", range: "50+ m³ / month", rate: 520, note: "Shops, schools, offices" },
];

export const PRODUCTION_LINES = [
  { name: "Line A — PET 500ml", status: "Running", output: 81000, efficiency: 97.2 },
  { name: "Line B — PET 1.5L", status: "Running", output: 54000, efficiency: 95.8 },
  { name: "Line C — Sachet", status: "Running", output: 120000, efficiency: 98.4 },
  { name: "Line D — 18.9L Dispenser", status: "Running", output: 3600, efficiency: 94.1 },
  { name: "Line E — Glass Premium", status: "Scheduled Maint.", output: 0, efficiency: 0 },
  { name: "Line F — Sparkling", status: "Running", output: 27000, efficiency: 96.3 },
];
