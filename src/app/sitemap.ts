import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";
import { getPostsByLang } from "../lib/posts";

export const dynamic = "force-static";

function safeDate(value: string, fallback: Date): Date {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const enPosts = getPostsByLang("en");
  const czPosts = getPostsByLang("cs");

  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now },
    { url: absoluteUrl("/cz"), lastModified: now },
    { url: absoluteUrl("/en"), lastModified: now },
    { url: absoluteUrl("/en/blog"), lastModified: now },
    { url: absoluteUrl("/cz/blog"), lastModified: now },
  ];

  enPosts.forEach((post) => {
    entries.push({
      url: absoluteUrl(`/en/blog/${post.slug}`),
      lastModified: safeDate(post.date, now),
    });
  });

  czPosts.forEach((post) => {
    entries.push({
      url: absoluteUrl(`/cz/blog/${post.slug}`),
      lastModified: safeDate(post.date, now),
    });
  });

  return entries;
}
