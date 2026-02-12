import Link from "next/link";
import type { Metadata } from "next";
import Wordmark from "../components/brand/Wordmark";
import {
  HREFLANG_LINKS,
  OG_IMAGE,
  ROOT_DESCRIPTION,
  ROOT_TITLE,
  SITE_NAME,
  absoluteUrl,
  buildJsonLd,
} from "../lib/seo";

export const metadata: Metadata = {
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: HREFLANG_LINKS,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    url: absoluteUrl("/"),
    locale: "en_US",
    alternateLocale: "cs_CZ",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: ROOT_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function Page() {
  const jsonLd = buildJsonLd("root");
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <script
        type="application/ld+json"
        id="archeon-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-container flex min-h-screen flex-col items-center justify-center gap-8 py-16 text-center">
        <Wordmark className="h-20 w-auto md:h-28 lg:h-32" ariaLabel="ΛRCHΞON – government operating system" />
        <div className="max-w-[60ch]">
          <h1 className="text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl">
            {ROOT_TITLE}
          </h1>
          <p className="mt-4 text-sm text-white/75 md:text-base">{ROOT_DESCRIPTION}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/en"
            className="hoverable rounded-[var(--radius-soft)] border border-white/30 bg-white/5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 transition hover:border-white/60 hover:bg-white/10 focus-visible:outline-offset-4 md:text-xs"
          >
            English
          </Link>
          <Link
            href="/cz"
            className="hoverable rounded-[var(--radius-soft)] border border-white/30 bg-white/5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 transition hover:border-white/60 hover:bg-white/10 focus-visible:outline-offset-4 md:text-xs"
          >
            Česky
          </Link>
        </div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
          Choose language to continue
        </p>
      </div>
    </main>
  );
}
