import type { ArchitectureLayerId, PillarId, UseCaseId } from "./types";

type Multilingual = {
  en: string;
  cz: string;
};

export type PillarDefinition = {
  id: PillarId;
  names: Multilingual;
  descriptions: Multilingual;
  logic: Multilingual;
  color: string;
};

export const pillars: PillarDefinition[] = [
  {
    id: "resources",
    names: { en: "Resources & Territory", cz: "ZDROJE" },
    descriptions: {
      en: "Physical reality and structural limits of the system.",
      cz: "Fyzická realita a limity systému.",
    },
    logic: {
      en: "System logic: Constraints & terrain.",
      cz: "Systémová logika: Limity a prostor.",
    },
    color: "#E53935",
  },
  {
    id: "services",
    names: { en: "Services & Care", cz: "SLUŽBY" },
    descriptions: {
      en: "Availability and capacity of care in space and time.",
      cz: "Dostupnost a kapacita péče v prostoru a čase.",
    },
    logic: {
      en: "System logic: Coverage & readiness.",
      cz: "Systémová logika: Pokrytí a připravenost.",
    },
    color: "#FB8C00",
  },
  {
    id: "citizens",
    names: { en: "Citizens & Society", cz: "OBČANÉ" },
    descriptions: {
      en: "Collective behavior, sentiment, and societal stability.",
      cz: "Kolektivní chování, nálada a stabilita společnosti.",
    },
    logic: {
      en: "System logic: Social equilibrium.",
      cz: "Systémová logika: Společenská rovnováha.",
    },
    color: "#FDD835",
  },
  {
    id: "family",
    names: { en: "Family & Stability", cz: "RODINA" },
    descriptions: {
      en: "Household resilience and long-term stability.",
      cz: "Odolnost domácností a dlouhodobá stabilita.",
    },
    logic: {
      en: "System logic: Continuity & resilience.",
      cz: "Systémová logika: Kontinuita a odolnost.",
    },
    color: "#43A047",
  },
  {
    id: "communication",
    names: { en: "Communication & Flow", cz: "KOMUNIKACE" },
    descriptions: {
      en: "Flows of people, information, and signals.",
      cz: "Toky lidí, informací a signálů.",
    },
    logic: {
      en: "System logic: Transmission & feedback.",
      cz: "Systémová logika: Přenos a zpětná vazba.",
    },
    color: "#42A5F5",
  },
  {
    id: "investments",
    names: { en: "Investments & Capital", cz: "INVESTICE" },
    descriptions: {
      en: "Allocation of capital and long-horizon capacity.",
      cz: "Alokace kapitálu a dlouhodobá kapacita.",
    },
    logic: {
      en: "System logic: Investment momentum.",
      cz: "Systémová logika: Investiční setrvačnost.",
    },
    color: "#3949AB",
  },
  {
    id: "responsibility",
    names: { en: "Responsibility & Power", cz: "ODPOVĚDNOST" },
    descriptions: {
      en: "Authority, accountability, and systemic integrity.",
      cz: "Autorita, odpovědnost a integrita systému.",
    },
    logic: {
      en: "System logic: Rules & accountability.",
      cz: "Systémová logika: Pravidla a odpovědnost.",
    },
    color: "#8E24AA",
  },
];

export const pillarUseCaseMap: Record<PillarId, UseCaseId[]> = {
  resources: ["antiFraud", "crisisSimulation"],
  services: ["crisisSimulation", "socialPrediction"],
  citizens: ["socialPrediction"],
  family: ["socialPrediction"],
  communication: ["antiFraud", "socialPrediction"],
  investments: ["crisisSimulation", "antiFraud"],
  responsibility: ["antiFraud", "crisisSimulation"],
};

export const pillarArchitectureMap: Record<PillarId, ArchitectureLayerId[]> = {
  resources: ["flow", "singleSourceOfTruth"],
  services: ["flow", "causality"],
  citizens: ["multilevelLOD", "causality"],
  family: ["multilevelLOD", "prediction"],
  communication: ["singleSourceOfTruth", "oversight"],
  investments: ["prediction", "flow"],
  responsibility: ["authority", "oversight", "singleSourceOfTruth"],
};
