import type { ArchitectureLayerId } from "./types";

type Multilingual = {
  en: string;
  cz: string;
};

export type ArchitectureLayer = {
  id: ArchitectureLayerId;
  titles: Multilingual;
  summary: Multilingual;
  detail: Multilingual;
  adjacency: ArchitectureLayerId[];
  position: {
    x: number;
    y: number;
  };
};

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "authority",
    titles: { en: "Authority", cz: "Autorita" },
    summary: {
      en: "Defines who can author rules and shift strategy.",
      cz: "Definuje, kdo může autorizovat pravidla a měnit strategii.",
    },
    detail: {
      en: "Authority anchors the decision horizon and frames accountability lines for every downstream layer.",
      cz: "Autorita ukotvuje rozhodovací horizont a vymezuje odpovědnost pro každou další úroveň.",
    },
    adjacency: ["oversight", "flow"],
    position: { x: 28, y: 18 },
  },
  {
    id: "oversight",
    titles: { en: "Oversight", cz: "Dohled" },
    summary: {
      en: "Monitors compliance and clarifies conditions for intervention.",
      cz: "Sleduje soulad a zpřesňuje podmínky pro zásah.",
    },
    detail: {
      en: "Oversight keeps analytics honest, feeds disturbances back to authorities, and keeps the single source aligned.",
      cz: "Dohled drží analytiku upřímnou, vrací narušení autoritám a udržuje jednotný zdroj.",
    },
    adjacency: ["authority", "singleSourceOfTruth"],
    position: { x: 58, y: 14 },
  },
  {
    id: "flow",
    titles: { en: "Flow", cz: "Tok" },
    summary: {
      en: "Tracks movement of resources, decisions, and signals.",
      cz: "Sleduje pohyb zdrojů, rozhodnutí a signálů.",
    },
    detail: {
      en: "Flow diagrams keep the causal chain intact and map how sectors influence one another in real time.",
      cz: "Tok udržuje kauzální řetěz, mapuje vzájemné vlivy sektorů v reálném čase.",
    },
    adjacency: ["authority", "causality"],
    position: { x: 25, y: 44 },
  },
  {
    id: "causality",
    titles: { en: "Causality", cz: "Kauzalita" },
    summary: {
      en: "Explores how actions ripple through the system.",
      cz: "Zkoumá, jak rozhodnutí rezonují systémem.",
    },
    detail: {
      en: "Causality layers reveal influence paths, readying the system for controlled projection and alerts.",
      cz: "Vrstva kauzality odhaluje cesty vlivu a připravuje systém pro kontrolované projekce a výstrahy.",
    },
    adjacency: ["flow", "prediction", "singleSourceOfTruth"],
    position: { x: 55, y: 46 },
  },
  {
    id: "prediction",
    titles: { en: "Prediction", cz: "Predikce" },
    summary: {
      en: "Projects near-term states with calibrated confidence.",
      cz: "Projekce nejbližších stavů s kalibrovanou důvěrou.",
    },
    detail: {
      en: "Prediction synthesizes models, advises authorities, and feeds the multilevel convergence pipeline.",
      cz: "Predikce syntetizuje modely, radí autoritám a napojuje víceúrovňovou konvergenční linku.",
    },
    adjacency: ["causality", "multilevelLOD"],
    position: { x: 82, y: 32 },
  },
  {
    id: "singleSourceOfTruth",
    titles: { en: "Single Source of Truth", cz: "Jednotný zdroj" },
    summary: {
      en: "Guarantees one consistent state especially for policy-critical facts.",
      cz: "Zaručuje jeden konzistentní stav, zvláště pro kritická fakta politiky.",
    },
    detail: {
      en: "The single source validates inputs, buffers destabilizing noise, and keeps oversight aligned with authority.",
      cz: "Jednotný zdroj validuje vstupy, tlumí šum a drží dohled v souladu s autoritou.",
    },
    adjacency: ["oversight", "causality", "multilevelLOD"],
    position: { x: 86, y: 10 },
  },
  {
    id: "multilevelLOD",
    titles: { en: "Multilevel LOD", cz: "Víceúrovňová detailnost" },
    summary: {
      en: "Offers granular or aggregate views without losing alignment.",
      cz: "Nabízí detailní i agregované pohledy bez ztráty souladu.",
    },
    detail: {
      en: "Multilevel LOD lets planners dive deep or zoom out while preserving shared definitions and predictions.",
      cz: "Víceúrovňová detailnost umožňuje plánovačům ponořit se či vystoupit bez ztráty sdílených definic.",
    },
    adjacency: ["prediction", "singleSourceOfTruth"],
    position: { x: 86, y: 52 },
  },
];
