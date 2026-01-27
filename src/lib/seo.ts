export const SITE_URL = "https://archeon.lucien.technology";
export const SITE_NAME = "ΛRCHΞON";
export const AUTHOR_NAME = "Adam Karl Lucien";
export const ORG_NAME = "Lucien Systems LLC";
export const CONTACT_EMAIL = "archeon@lucien.technology";

export const DEFAULT_TITLES = {
  cz: "ΛRCHΞON – Operační systém státu postavený na kauzální AI",
  en: "ΛRCHΞON – Causal AI Operating System for Government",
};

export const DEFAULT_DESCRIPTIONS = {
  cz: "ΛRCHΞON je grafově nativní digitální dvojče státu pro simulaci, predikci a systémové řízení. Auditovatelný, rights-first.",
  en: "ΛRCHΞON is a graph-native digital twin of the state for simulation, prediction, and systemic governance. Auditable, rights-first.",
};

export const OG_IMAGE = `${SITE_URL}/og.jpg`;

export const absoluteUrl = (path: string) => {
  if (path.startsWith("http")) {
    return path;
  }
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
