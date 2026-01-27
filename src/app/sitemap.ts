import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/cz`,
      lastModified: now,
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
    },
  ];
}
