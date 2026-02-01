import { cz } from "../../../content/i18n/cz";
import { en } from "../../../content/i18n/en";
import PageShell from "../../components/PageShell";
import type { LanguageCode } from "../../../content/i18n/types";
import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTIONS,
  DEFAULT_TITLES,
  SITE_NAME,
  HREFLANG_LINKS,
  absoluteUrl,
  OG_IMAGE,
} from "../../lib/seo";

const languageList: LanguageCode[] = ["en", "cz"];

export const dynamicParams = false;

export function generateStaticParams() {
  return languageList.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const rawLang = typeof resolvedParams?.lang === "string" ? resolvedParams.lang : undefined;
  const lang = rawLang && isLanguageCode(rawLang) ? rawLang : "en";
  const isCz = lang === "cz";
  const title = isCz ? DEFAULT_TITLES.cz : DEFAULT_TITLES.en;
  const description = isCz ? DEFAULT_DESCRIPTIONS.cz : DEFAULT_DESCRIPTIONS.en;
  const locale = isCz ? "cs_CZ" : "en_US";
  const pageUrl = absoluteUrl(isCz ? "/cz" : "/en");

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: HREFLANG_LINKS,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: pageUrl,
      locale,
      alternateLocale: isCz ? "en_US" : "cs_CZ",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

const isLanguageCode = (value: string): value is LanguageCode =>
  languageList.includes(value as LanguageCode);

export default async function LangPage({ params }: PageProps<"/[lang]">) {
  const resolvedParams = await params;
  const lang = isLanguageCode(resolvedParams.lang) ? resolvedParams.lang : "en";
  const content = lang === "cz" ? cz : en;
  return (
    <PageShell lang={lang} content={content} />
  );
}
