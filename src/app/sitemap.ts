import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/cz") },
    { url: absoluteUrl("/en") },
  ];

  return entries;
}
