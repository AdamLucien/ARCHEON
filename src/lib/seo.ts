export const SITE_URL = "https://archeon.lucien.technology";
export const SITE_NAME = "ΛRCHΞON";
export const AUTHOR_NAME = "Adam Karl Lucien";
export const ORG_NAME = "Lucien Systems LLC";
export const CONTACT_EMAIL = "archeon@lucien.technology";

export const ROOT_TITLE = "ΛRCHΞON — Strategic Intelligence Architecture for Governance";
export const ROOT_DESCRIPTION =
  "ΛRCHΞON is a strategic intelligence framework for state-level decision-making, resilience planning, and long-horizon foresight. A public vision by Lucien Systems LLC.";

export const DEFAULT_TITLES = {
  cz: "ΛRCHΞON — Strategická inteligence pro rozhodování státu",
  en: "ΛRCHΞON — Strategic Intelligence for State-Scale Decisions",
};

export const DEFAULT_DESCRIPTIONS = {
  cz: "Veřejná strategická prezentace ΛRCHΞON: architektura pro odolnost, předvídavost a rozhodování na úrovni státu.",
  en: "A public strategic presentation of ΛRCHΞON: a governance intelligence architecture for resilience, foresight, and decisive leadership at national scale.",
};

export const SOFTWARE_APPLICATION_DESCRIPTION =
  "Strategic intelligence framework for governance, resilience, and foresight.";

export const OG_IMAGE = `${SITE_URL}/og.jpg`;

export const absoluteUrl = (path: string) => {
  if (path.startsWith("http")) {
    return path;
  }
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const HREFLANG_LINKS = {
  "en-US": absoluteUrl("/en"),
  "cs-CZ": absoluteUrl("/cz"),
  "x-default": absoluteUrl("/"),
};

export type SeoPageKey = "root" | "en" | "cz";

export const getPageMeta = (key: SeoPageKey) => {
  if (key === "en") {
    return {
      title: DEFAULT_TITLES.en,
      description: DEFAULT_DESCRIPTIONS.en,
      url: absoluteUrl("/en"),
      locale: "en_US",
      inLanguage: "en",
    };
  }
  if (key === "cz") {
    return {
      title: DEFAULT_TITLES.cz,
      description: DEFAULT_DESCRIPTIONS.cz,
      url: absoluteUrl("/cz"),
      locale: "cs_CZ",
      inLanguage: "cs",
    };
  }
  return {
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    url: absoluteUrl("/"),
    locale: "en_US",
    inLanguage: "en",
  };
};

export const buildJsonLd = (key: SeoPageKey) => {
  const page = getPageMeta(key);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: ORG_NAME,
        url: SITE_URL,
        founder: { "@type": "Person", name: AUTHOR_NAME },
        contactPoint: {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          contactType: "official",
        },
        brand: { "@id": `${SITE_URL}#brand` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}#founder`,
        name: AUTHOR_NAME,
        jobTitle: "Founder",
        affiliation: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
      },
      {
        "@type": "Brand",
        "@id": `${SITE_URL}#brand`,
        name: SITE_NAME,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}#software`,
        name: SITE_NAME,
        applicationCategory: "GovernmentApplication",
        operatingSystem: "Web",
        description: SOFTWARE_APPLICATION_DESCRIPTION,
        creator: { "@type": "Person", name: AUTHOR_NAME },
        publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
        brand: { "@id": `${SITE_URL}#brand` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}#organization` },
        inLanguage: ["en", "cs"],
      },
      {
        "@type": "WebPage",
        "@id": `${page.url}#webpage`,
        url: page.url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${SITE_URL}#website` },
        about: { "@id": `${SITE_URL}#software` },
        inLanguage: page.inLanguage,
        publisher: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${page.url}#breadcrumbs`,
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: page.url }],
      },
    ],
  };
};
