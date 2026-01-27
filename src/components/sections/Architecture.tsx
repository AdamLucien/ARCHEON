"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { Section } from "../layout/Section";

type ArchitectureBlock = {
  id: "graph" | "truth" | "simulation" | "noxis";
  title: string;
  body: string;
  items?: string[];
};

type ArchitectureProps = {
  heading: string;
  body: string;
  blocks: ArchitectureBlock[];
  reduceMotion: boolean;
  sectionTag: string;
  lang: "en" | "cz";
  srSummary: string;
};

type StackLayer = {
  id: ArchitectureBlock["id"];
  title: string;
  caption: string;
};

const mobileLabels: Record<ArchitectureBlock["id"], { en: string; cz: string }> = {
  graph: { en: "GRAPH CORE", cz: "GRAFOVÉ JÁDRO" },
  truth: { en: "SSoT", cz: "SSoT" },
  simulation: { en: "LOD", cz: "LOD" },
  noxis: { en: "NOXIS", cz: "NOXIS" },
};

function MobileStack({
  activeId,
  lang,
}: {
  activeId: ArchitectureBlock["id"];
  lang: "en" | "cz";
}) {
  const tiles: StackLayer[] = [
    {
      id: "graph",
      title: lang === "cz" ? "Grafové jádro" : "Graph Core",
      caption:
        lang === "cz"
          ? "Autorita · Dohled · Tok · Kauzalita · Predikce"
          : "Authority · Oversight · Flow · Causality · Prediction",
    },
    {
      id: "truth",
      title: lang === "cz" ? "Vrstva pravdy" : "Truth Layer",
      caption: lang === "cz" ? "Validovaný stav · Auditní stopa" : "Validated state · Audit trail",
    },
    {
      id: "simulation",
      title: lang === "cz" ? "Simulační vrstva" : "Simulation Layer",
      caption: lang === "cz" ? "LOD 0→4 · Makro → transakce" : "LOD 0→4 · Macro → transaction",
    },
    {
      id: "noxis",
      title: "NOXIS",
      caption:
        lang === "cz"
          ? "Narativní grafy · Anomální čočka"
          : "Narrative graphs · Anomaly lens",
    },
  ];

  return (
    <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <span className="sr-only">
        {lang === "cz" ? "Aktivní vrstva" : "Active layer"}:{" "}
        {tiles.find((tile) => tile.id === activeId)?.title}
      </span>
      {tiles.map((tile) => {
        const isActive = tile.id === activeId;
        return (
          <div
            key={tile.id}
            className={clsx(
              "rounded-xl border px-4 py-3 transition-[transform,opacity] duration-200 ease-out",
              isActive
                ? "border-white/30 bg-[#141414] text-white shadow-[0_0_16px_rgba(255,255,255,0.12)]"
                : "border-white/10 bg-[#0a0a0a] text-white/55"
            )}
          >
            <p className="text-xs font-medium text-white/95">{tile.title}</p>
            <p className="mt-1 text-[11px] text-white/65">{tile.caption}</p>
          </div>
        );
      })}
    </div>
  );
}

function StackDiagram({
  activeId,
  layers,
}: {
  activeId: ArchitectureBlock["id"];
  layers: StackLayer[];
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.55),0_2px_12px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent opacity-70"
        aria-hidden="true"
      />
      <div className="space-y-5">
        {layers.map((layer, index) => {
          const isActive = layer.id === activeId;
          return (
            <div key={layer.id}>
              <div
                className={`relative rounded-2xl border px-5 py-4 transition-[transform,opacity] duration-200 ease-out will-change-transform hover:-translate-y-0.5 hover:border-white/20 motion-reduce:transform-none ${
                  isActive
                    ? "border-white/30 bg-[#141414] text-white shadow-[0_0_24px_rgba(255,255,255,0.12)]"
                    : "border-white/10 bg-[#0c0c0c] text-white/55"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Layer</p>
                <p className="mt-2 text-[18px] font-medium tracking-[-0.01em] text-white/95">
                  {layer.title}
                </p>
                <p className="mt-2 text-xs text-white/65">{layer.caption}</p>
              </div>
              {index < layers.length - 1 ? (
                <div className="mx-auto h-6 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent opacity-50" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArchitectureBlockItem({
  block,
  onActive,
}: {
  block: ArchitectureBlock;
  onActive: (id: ArchitectureBlock["id"]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null!);
  const isInView = useInView(ref, { amount: 0.5, margin: "-10% 0px -60% 0px" });

  useEffect(() => {
    if (isInView) {
      onActive(block.id);
    }
  }, [block.id, isInView, onActive]);

  return (
    <div
      ref={ref}
      data-reveal-item
      className="group relative rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 md:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.55),0_2px_12px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] transition-[transform,opacity] duration-200 ease-out will-change-transform hover:-translate-y-0.5 hover:border-white/20 motion-reduce:transform-none"
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent opacity-60"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        aria-hidden="true"
      />
      <h3 className="text-[18px] font-medium tracking-[-0.01em] text-white/95 md:text-[20px]">
        {block.title}
      </h3>
      <p className="mt-3 text-sm text-white/72 leading-relaxed md:text-base">{block.body}</p>
      {block.items?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2 text-sm text-white/70 md:text-base">
          {block.items.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] text-white/75"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.35)]"
                aria-hidden="true"
              />
              <span className="text-[12px]">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ArchitectureMobile({
  heading,
  body,
  blocks,
  reduceMotion,
  sectionTag,
  lang,
  srSummary,
}: ArchitectureProps) {
  void reduceMotion;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null!);

  const orderedBlocks = useMemo(() => {
    const map = new Map(blocks.map((block) => [block.id, block]));
    return ["graph", "truth", "simulation", "noxis"].map((id) => map.get(id as ArchitectureBlock["id"])!).filter(Boolean);
  }, [blocks]);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    const root = scrollRef.current;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-arch-card]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const index = Number(visible[0].target.getAttribute("data-index"));
          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        }
      },
      { root, threshold: [0.4, 0.6, 0.8] }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [orderedBlocks.length]);

  return (
    <div className="lg:hidden">
      <div>
        <p data-reveal-item className="text-[11px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
          {sectionTag}
        </p>
        <h2
          id="architecture-heading-mobile"
          data-reveal-item
          className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl"
        >
          {heading}
        </h2>
        <p className="sr-only">{srSummary}</p>
        <p data-reveal-item className="mt-4 text-sm text-white/70 leading-7 md:text-base">{body}</p>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-end text-[11px] uppercase tracking-[0.24em] text-white/50">
          <span>
            {activeIndex + 1}/{orderedBlocks.length}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {orderedBlocks.map((_, index) => (
            <span
              key={index}
              className={clsx(
                "h-1.5 w-6 rounded-full transition-colors",
                index === activeIndex ? "bg-white/70" : "bg-white/20"
              )}
            />
          ))}
        </div>
        <div
          ref={scrollRef}
          data-reveal-item
          className="mt-4 max-h-[calc(100vh-var(--navbar-height)-220px)] snap-y snap-mandatory overflow-y-auto pr-2"
        >
          <div className="space-y-5">
            {orderedBlocks.map((block, index) => (
              <div
                key={block.id}
                data-arch-card
                data-index={index}
                className="snap-start rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                  {mobileLabels[block.id][lang]}
                </p>
                <h3 className="mt-2 text-[18px] font-medium tracking-[-0.01em] text-white/95">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm text-white/72 leading-relaxed">{block.body}</p>
                {block.items?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] text-white/75"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.35)]"
                          aria-hidden="true"
                        />
                        <span className="text-[12px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <MobileStack activeId={block.id} lang={lang} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDesktop({
  heading,
  body,
  blocks,
  reduceMotion,
  sectionTag,
  lang,
  srSummary,
}: ArchitectureProps) {
  const [activeId, setActiveId] = useState<ArchitectureBlock["id"]>(blocks[0]?.id ?? "graph");
  void reduceMotion;

  const handleActive = useCallback((id: ArchitectureBlock["id"]) => {
    setActiveId((prev) => (prev === id ? prev : id));
  }, []);

  const layers: StackLayer[] = [
    {
      id: "graph",
      title: lang === "cz" ? "Grafové jádro" : "Graph Core",
      caption:
        lang === "cz"
          ? "Autorita · Dohled · Tok · Kauzalita · Predikce"
          : "Authority · Oversight · Flow · Causality · Prediction",
    },
    {
      id: "truth",
      title: lang === "cz" ? "Vrstva pravdy" : "Truth Layer",
      caption:
        lang === "cz"
          ? "Validovaný stav · Auditní stopa"
          : "Validated state · Audit trail",
    },
    {
      id: "simulation",
      title: lang === "cz" ? "Simulační vrstva" : "Simulation Layer",
      caption:
        lang === "cz"
          ? "LOD 0→4 · Makro → transakce"
          : "LOD 0→4 · Macro → transaction",
    },
    {
      id: "noxis",
      title: "NOXIS",
      caption:
        lang === "cz"
          ? "Narativní grafy · Anomální čočka"
          : "Narrative graphs · Anomaly lens",
    },
  ];

  return (
    <div className="hidden lg:block">
      <div>
        <p data-reveal-item className="text-[11px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
          {sectionTag}
        </p>
        <h2
          id="architecture-heading-desktop"
          data-reveal-item
          className="mt-4 text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>
        <p className="sr-only">{srSummary}</p>
        <p data-reveal-item className="mt-5 max-w-2xl text-base text-white/70 leading-7 md:text-lg">
          {body}
        </p>
      </div>
      <div data-reveal-item className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="max-w-[640px] space-y-6">
          {blocks.map((block) => (
            <ArchitectureBlockItem
              key={block.id}
              block={block}
              onActive={handleActive}
            />
          ))}
        </div>
        <div className="lg:sticky lg:top-24 self-start">
          <StackDiagram activeId={activeId} layers={layers} />
        </div>
      </div>
    </div>
  );
}

export default function Architecture({
  heading,
  body,
  blocks,
  reduceMotion,
  sectionTag,
  lang,
  srSummary,
}: ArchitectureProps) {
  return (
    <Section id="architecture" ariaLabelledBy="architecture-heading-mobile architecture-heading-desktop">
      <ArchitectureMobile
        heading={heading}
        body={body}
        blocks={blocks}
        reduceMotion={reduceMotion}
        sectionTag={sectionTag}
        lang={lang}
        srSummary={srSummary}
      />
      <ArchitectureDesktop
        heading={heading}
        body={body}
        blocks={blocks}
        reduceMotion={reduceMotion}
        sectionTag={sectionTag}
        lang={lang}
        srSummary={srSummary}
      />
    </Section>
  );
}
