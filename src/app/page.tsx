import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  HREFLANG_LINKS,
  OG_IMAGE,
  ROOT_DESCRIPTION,
  ROOT_TITLE,
  SITE_NAME,
  absoluteUrl,
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
  redirect("/en");
}
