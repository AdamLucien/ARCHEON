import type { UseCaseId } from "./types";

type Multilingual = {
  en: string;
  cz: string;
};

export type UseCaseDefinition = {
  id: UseCaseId;
  title: Multilingual;
  analysis: Multilingual;
  result: Multilingual;
  signalPattern: number[];
};

export const useCases: UseCaseDefinition[] = [
  {
    id: "antiFraud",
    title: {
      en: "Anti-Fraud: Octopus X-ray",
      cz: "Anti-Fraud: Rentgen chobotnic",
    },
    analysis: {
      en: "Traces hidden ownership and influence structures across complex networks.",
      cz: "Trasuje skryté vlastnické a vlivové struktury napříč složitými sítěmi.",
    },
    result: {
      en: "Surfaces ultimate control patterns early enough for intervention.",
      cz: "Odhalí vzorce konečné kontroly včas pro zásah.",
    },
    signalPattern: [0.7, 0.35, 0.9, 0.4, 0.6, 0.2, 0.85, 0.3, 0.65, 0.4],
  },
  {
    id: "crisisSimulation",
    title: {
      en: "Crisis Simulation: Butterfly Effect",
      cz: "Krizová simulace: Efekt motýlích křídel",
    },
    analysis: {
      en: "Models cascading impacts when a local disruption hits critical dependencies.",
      cz: "Modeluje kaskádové dopady, když lokální výpadek zasáhne kritické závislosti.",
    },
    result: {
      en: "Enables proactive coordination instead of reactive chaos.",
      cz: "Umožní proaktivní koordinaci místo reaktivního chaosu.",
    },
    signalPattern: [0.35, 0.6, 0.25, 0.8, 0.4, 0.7, 0.3, 0.6, 0.45, 0.75],
  },
  {
    id: "socialPrediction",
    title: {
      en: "Social Prediction: Stress Map",
      cz: "Sociální predikce: Mapa stresu",
    },
    analysis: {
      en: "Detects rising systemic pressure before it becomes visible in headlines.",
      cz: "Zachycuje růst systémového tlaku dřív, než je vidět v titulcích.",
    },
    result: {
      en: "Targets support where it prevents escalation.",
      cz: "Zacíluje podporu tam, kde zabrání eskalaci.",
    },
    signalPattern: [0.25, 0.55, 0.35, 0.7, 0.3, 0.6, 0.25, 0.5, 0.35, 0.6],
  },
  {
    id: "infrastructureResilience",
    title: {
      en: "Infrastructure Resilience: Weak-Link Scan",
      cz: "Odolnost infrastruktury: Skener slabých článků",
    },
    analysis: {
      en: "Identifies fragile points where small failures can trigger outsized disruption.",
      cz: "Identifikuje křehká místa, kde malé selhání spouští nepřiměřené dopady.",
    },
    result: {
      en: "Prioritizes reinforcement with the highest systemic leverage.",
      cz: "Prioritizuje posílení s nejvyšší systémovou pákou.",
    },
    signalPattern: [0.6, 0.3, 0.75, 0.4, 0.55, 0.25, 0.7, 0.3, 0.6, 0.35],
  },
  {
    id: "budgetIntegrity",
    title: {
      en: "Budget Integrity: Leakage Radar",
      cz: "Integrita rozpočtu: Radar úniků",
    },
    analysis: {
      en: "Highlights anomalous flows and misalignment between intent and outcome.",
      cz: "Zvýrazní anomální toky a nesoulad mezi záměrem a výsledkem.",
    },
    result: {
      en: "Improves accountability without slowing down delivery.",
      cz: "Zvyšuje odpovědnost bez zpomalení doručení.",
    },
    signalPattern: [0.4, 0.65, 0.3, 0.6, 0.45, 0.7, 0.25, 0.55, 0.35, 0.6],
  },
  {
    id: "informationSpace",
    title: {
      en: "Information Space: Narrative Drift Monitor",
      cz: "Informační prostor: Monitor narativního driftu",
    },
    analysis: {
      en: "Maps coordinated narrative shifts as structural change, not keyword noise.",
      cz: "Mapuje koordinované posuny narativů jako strukturální změnu, ne šum klíčových slov.",
    },
    result: {
      en: "Distinguishes organic public discourse from synchronized manipulation.",
      cz: "Rozlišuje organickou veřejnou debatu od synchronizované manipulace.",
    },
    signalPattern: [0.3, 0.5, 0.65, 0.35, 0.75, 0.4, 0.6, 0.3, 0.7, 0.45],
  },
];
