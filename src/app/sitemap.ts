import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now },
    { url: absoluteUrl("/cz"), lastModified: now },
    { url: absoluteUrl("/en"), lastModified: now },
  ];

  return entries;
}
