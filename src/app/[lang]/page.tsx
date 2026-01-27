import { cz } from "../../../content/i18n/cz";
import { en } from "../../../content/i18n/en";
import PageShell from "../../components/PageShell";
import type { LanguageCode } from "../../../content/i18n/types";
import Script from "next/script";
import type { Metadata } from "next";
import {
  AUTHOR_NAME,
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTIONS,
  DEFAULT_TITLES,
  ORG_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  OG_IMAGE,
} from "../../lib/seo";

const languageList: LanguageCode[] = ["en", "cz"];

export const dynamicParams = false;

export function generateStaticParams() {
  return languageList.map((lang) => ({ lang }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: LanguageCode };
}): Metadata {
  const lang = languageList.includes(params.lang) ? params.lang : "cz";
  const isCz = lang === "cz";
  const title = isCz ? DEFAULT_TITLES.cz : DEFAULT_TITLES.en;
  const description = isCz ? DEFAULT_DESCRIPTIONS.cz : DEFAULT_DESCRIPTIONS.en;
  const locale = isCz ? "cs_CZ" : "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: SITE_URL,
      languages: {
        "cs-CZ": SITE_URL,
        "en-US": absoluteUrl("/en"),
      },
    },
    authors: [{ name: AUTHOR_NAME }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: SITE_URL,
      locale,
      alternateLocale: isCz ? "en_US" : "cs_CZ",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    other: {
      author: AUTHOR_NAME,
    },
    themeColor: "#121212",
  };
}

type LangPageProps = {
  params: Promise<{
    lang: LanguageCode;
  }>;
};

export default async function LangPage({ params }: LangPageProps) {
  const resolvedParams = await params;
  const lang = languageList.includes(resolvedParams.lang) ? resolvedParams.lang : "en";
  const content = lang === "cz" ? cz : en;
  const isCz = lang === "cz";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: ORG_NAME,
        url: SITE_URL,
        contactPoint: {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          contactType: "official",
        },
      },
      {
        "@type": "Person",
        name: AUTHOR_NAME,
      },
      {
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "GovernmentApplication",
        operatingSystem: "Web",
        creator: { "@type": "Person", name: AUTHOR_NAME },
        publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
        description: DEFAULT_DESCRIPTIONS.en,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}#webpage`,
        name: isCz ? DEFAULT_TITLES.cz : DEFAULT_TITLES.en,
        isPartOf: { "@id": `${SITE_URL}#website` },
        about: { "@type": "SoftwareApplication", name: SITE_NAME },
        url: SITE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Architecture", item: `${SITE_URL}/#architecture` },
          { "@type": "ListItem", position: 3, name: "Pillars", item: `${SITE_URL}/#pillars` },
          { "@type": "ListItem", position: 4, name: "Use Cases", item: `${SITE_URL}/#use-cases` },
          { "@type": "ListItem", position: 5, name: "Implementation", item: `${SITE_URL}/#implementation` },
          { "@type": "ListItem", position: 6, name: "Contact", item: `${SITE_URL}/#contact` },
        ],
      },
    ],
  };
  return (
    <>
      <Script
        id="archeon-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell lang={lang} content={content} />
    </>
  );
}
