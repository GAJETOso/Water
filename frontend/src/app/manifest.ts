import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.name} — ${COMPANY.tagline}`,
    short_name: COMPANY.name,
    description: COMPANY.description,
    start_url: "/",
    display: "standalone",
    background_color: "#040B16",
    theme_color: "#040B16",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
