import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/data";

const routes = [
  "",
  "/products",
  "/water-supply",
  "/water-supply/my-meter",
  "/manufacturing",
  "/industries",
  "/sustainability",
  "/foundation",
  "/esg",
  "/certifications",
  "/about",
  "/contact",
  "/portals",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${COMPANY.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
