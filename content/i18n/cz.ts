export const cz = {
  wordmark: "ΛRCHΞON",
  nav: {
    sections: [
      { id: "architecture", label: "Architektura" },
      { id: "pillars", label: "Pilíře" },
      { id: "use-cases", label: "Use cases" },
      { id: "implementation", label: "Implementace" },
      { id: "contact", label: "Kontakt" },
    ],
    primaryCta: "Kontakt / Demo",
    languageLabel: "Jazyk",
  },
  labels: {
    menu: "Menu",
    close: "Zavřít",
    toggleNav: "Přepnout navigaci",
    diagram: "Diagram",
    pinnedLayer: "Připnutá vrstva",
    systemOverview: "Systémový přehled",
    useCasesTag: "USE CASES",
    architectureTag: "ARCHITEKTURA",
    pillarsTag: "Pilíře",
    implementationTag: "Implementace",
    contactTag: "Kontakt",
    pinnedState: "Aktivní",
    logicLabel: "Logika",
    focusState: "Fokus",
    adjacencies: "vazby",
  },
  a11y: {
    navPrimaryLabel: "Primární navigace",
    mainLabel: "Hlavní obsah stránky ΛRCHΞON",
    footerLabel: "Patička webu",
    wordmarkLabel: "ΛRCHΞON – operační systém státu",
    heroSummary:
      "ΛRCHΞON je operační systém státu postavený na kauzální AI pro simulaci, predikci a auditovatelná rozhodnutí.",
    architectureSummary:
      "Grafově nativní kauzální architektura pro systémové řízení, auditní stopu a rights-first analýzu.",
    pillarsSummary:
      "Sedm pilířů modeluje stát jako propojený digitální organismus; vztahy mezi doménami jsou kauzální.",
    useCasesSummary:
      "Scénáře použití ukazují systémové dopady a rozhodovací výstupy bez zveřejnění interních datových zdrojů.",
    implementationSummary:
      "Postupná implementace formou ověřitelných řezů, datové integrity a predikce jako služby.",
    contactSummary: "Oficiální kontakt pro institucionální a odborný dialog.",
    notGame: "Nejde o videohru ani zábavní simulaci; jde o systém pro veřejný sektor.",
    navCtaLabel: "Kontakt / Demo",
    contactCtaLabel: "Zahájit odborný dialog",
  },
  hero: {
    kicker: "Vize",
    heading: "Operační systém České republiky",
    subclaim: "Od tabulek k souvislostem. Od reakce k predikci.",
    body:
      "Představujeme ΛRCHΞON – první plnohodnotné digitální dvojče státu. Systém, který integruje fyzickou realitu, ekonomické toky a společenskou dynamiku do jednoho kauzálního modelu. Není to jen vizualizace dat; je to nástroj pro strategické řízení státu v 21. století.",
    bullets: [
      "Vidět: Skryté vazby a toky peněz, které v tabulkách nenajdete.",
      "Chápat: Jak výpadek v infrastruktuře ovlivní ekonomiku regionu.",
      "Předvídat: Kde hrozí sociální nepokoje nebo kolaps zdravotnictví dříve, než to nastane.",
    ],
    primaryCta: "Kontakt / Demo",
    secondaryCta: "Prozkoumat architekturu",
  },
  architecture: {
    heading: "Kauzální státní engine",
    body:
      "ARCHEON je grafově nativní, auditovatelný simulační systém — integruje fyzickou realitu, toky kapitálu a narativní dynamiku do jednoho kauzálního modelu.",
    blocks: [
      {
        id: "graph" as const,
        title: "Grafově nativní kauzální engine (Neo4j)",
        body:
          "Jádrem je živý graf, ne sklad dokumentů. Modeluje realitu jako síť vztahů, které se v čase mění.",
        items: [
          "Autorita",
          "Dohled",
          "Tok",
          "Kauzalita",
          "Predikce",
        ],
      },
      {
        id: "truth" as const,
        title: "Single Source of Truth (SSoT)",
        body:
          "Validovaná fakta jsou uložená jednou; všechny pohledy jsou generované. Rozhodování zůstává auditovatelné a dohledatelné.",
      },
      {
        id: "simulation" as const,
        title: "Multilevel Level-of-Detail (LOD)",
        body:
          "Od LOD‑0 po LOD‑4 model plynule přechází od makra k transakci bez ztráty kontextu.",
      },
      {
        id: "noxis" as const,
        title: "NOXIS: narativní inteligence (OSINT, rights-first)",
        body:
          "Nejde o keyword monitoring ani sledování jednotlivců. NOXIS mapuje strukturu a šíření narativů v měřítku systému.",
        items: [
          "Narativní grafy",
          "Anomální čočka",
          "Multimodální AI",
          "Privacy-first",
        ],
      },
    ],
  },
  pillars: {
    heading: "Sedm pilířů ekosystému",
    body:
      "Modelujeme stát v sedmi dimenzích, které se vzájemně ovlivňují.",
    connectionLabel: "Napojené use cases",
    mobileCausalHint: "Změna v tomto pilíři se projeví v dalších vrstvách systému.",
    noxisHint: "Analyzuje strukturu a šíření informací.",
    logicLabel: "Systémová logika",
  },
  useCases: {
    heading: "Scénáře, kde rozhoduje kauzalita.",
    body: "Šest provozních scénářů ukazuje systémové uvažování bez odhalení interních detailů.",
  },
  implementation: {
    heading: "Strategie implementace",
    intro: "Postupný rollout s auditní stopou a rychlým ověřením hodnoty.",
    labels: {
      what: "Co to dělá",
      why: "Proč to funguje",
    },
    steps: [
      {
        id: "verticalSlice",
        title: "Vertikální řez",
        summary: "Úzký end-to-end řez systémem pro rychlé ověření hodnoty bez plošného zásahu.",
        what: [
          "Vybereme jeden konkrétní tok a projdeme celý cyklus.",
          "Ověříme dopady napříč vrstvami bez plošného nasazení.",
          "Získáme měřitelnou hodnotu v krátkém čase.",
        ],
        why: "Minimalizuje riziko a urychluje rozhodnutí o dalším rozšíření.",
        stageLabel: "Stage A",
        signalPattern: [0.7, 0.35, 0.6, 0.25, 0.8, 0.4, 0.55, 0.3, 0.65, 0.45],
      },
      {
        id: "dataIntegrity",
        title: "Datová integrita",
        summary: "Sjednocení entit a očista dat napříč zdroji do jednoho auditovatelného základu.",
        what: [
          "Spojujeme duplicity a nekonzistence do jedné identity.",
          "Normalizujeme vstupy pro spolehlivé vazby.",
          "Udržujeme průkaznou stopu změn.",
        ],
        why: "Stabilní základ je nutný pro bezpečné řízení i predikci.",
        stageLabel: "Stage B",
        signalPattern: [0.4, 0.6, 0.35, 0.7, 0.3, 0.65, 0.4, 0.55, 0.35, 0.6],
      },
      {
        id: "predictionService",
        title: "Predikce jako služba",
        summary: "Predikce jako živá služba zapsaná zpět do modelu pro další analýzu.",
        what: [
          "Výstupy se stávají součástí systému, ne externí zprávou.",
          "Model se průběžně zpřesňuje na základě nových signálů.",
          "Predikce jsou dostupné napříč vrstvami.",
        ],
        why: "Systém zůstává konzistentní a učí se v čase.",
        stageLabel: "Stage C",
        signalPattern: [0.35, 0.5, 0.75, 0.4, 0.6, 0.3, 0.7, 0.35, 0.6, 0.45],
      },
    ],
  },
  seo: {
    heading: "Systémová dokumentace – přehled",
    body: [
      "ARCHEON (ΛRCHΞON) je kauzální inteligence na úrovni státu pro Českou republiku. Modeluje autoritu, dohled, toky a predikce jako jeden auditovatelný graf, aby byly rozhodovací řetězce dohledatelné.",
      "Systém je navržen jako digitální dvojče s víceúrovňovou detailností (LOD‑0 až LOD‑4). To umožňuje makro plánování, simulace infrastruktury a analýzu dopadů politik bez ztráty odpovědnosti.",
      "NOXIS je vrstva integrity narativů: mapuje strukturu informačních toků v měřítku systému a vyznačuje anomální vzory bez sledování jednotlivců.",
    ],
  },
  contact: {
    closingLine:
      "ΛRCHΞON dává státu paměť, zrak a schopnost vidět budoucnost.",
    subline:
      "Technologie pro odolnou Českou republiku. Navržená pro dlouhodobé řízení, nikoliv krátkodobé reakce.",
    cta: "Zahájit odborný dialog",
    ctaNote: "Pro instituce, experty a strategické partnery.",
    email: "archeon@lucien.technology",
  },
  footer: {
    line:
      "ΛRCHΞON — systém, který dává státu paměť, zrak a schopnost vidět budoucnost. Technologie pro odolnou Českou republiku.",
  },
};
