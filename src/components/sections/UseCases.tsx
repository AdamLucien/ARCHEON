"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, MutableRefObject, RefObject } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "../layout/Section";
import { useCases } from "../../../content/useCases";
import type { UseCaseDefinition } from "../../../content/useCases";
import type { UseCaseId } from "../../../content/types";

type UseCasesProps = {
  heading: string;
  body: string;
  reduceMotion: boolean;
  lang: "en" | "cz";
  sectionTag: string;
  srSummary: string;
};

type UseCaseNavProps = {
  scenarios: UseCaseDefinition[];
  activeId: UseCaseId;
  lang: "en" | "cz";
  onSelect: (id: UseCaseId) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  tabsRef: MutableRefObject<Array<HTMLButtonElement | null>>;
};

type UseCaseDetailProps = {
  scenario: UseCaseDefinition;
  lang: "en" | "cz";
  reduceMotion: boolean;
  detailRef: RefObject<HTMLDivElement>;
};

function SignalStrip({ pattern, reduceMotion }: { pattern: number[]; reduceMotion: boolean }) {
  return (
    <div className="mt-6 flex items-center gap-1" aria-hidden="true">
      {pattern.map((value, index) => (
        <motion.span
          key={`${pattern.join("-")}-${index}`}
          initial={reduceMotion ? { opacity: value, y: 0 } : { opacity: 0, y: 2 }}
          animate={{ opacity: value, y: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
            delay: reduceMotion ? 0 : index * 0.015,
          }}
          className="h-1.5 w-4 rounded-full bg-white/40"
          style={{ opacity: value }}
        />
      ))}
    </div>
  );
}

function UseCaseNav({
  scenarios,
  activeId,
  lang,
  onSelect,
  onKeyDown,
  tabsRef,
}: UseCaseNavProps) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 lg:w-[320px] lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0"
      role="tablist"
      aria-label="Use cases"
      onKeyDown={onKeyDown}
    >
      {scenarios.map((scenario, index) => {
        const isActive = scenario.id === activeId;
        return (
          <button
            key={scenario.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            role="tab"
            id={`usecase-tab-${scenario.id}`}
            aria-selected={isActive}
            aria-controls="usecase-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(scenario.id)}
            className={clsx(
              "flex h-11 min-w-0 shrink-0 items-center justify-between rounded-xl border px-4 text-left text-[11px] uppercase tracking-[0.24em] transition-all md:text-xs",
              "snap-start lg:snap-none",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50",
              isActive
                ? "border-white/30 bg-white/[0.06] text-white shadow-[0_0_16px_rgba(255,255,255,0.12)]"
                : "border-white/10 text-white/60 hover:border-white/20 hover:text-white/90"
            )}
          >
            <span className="truncate">{scenario.title[lang]}</span>
          </button>
        );
      })}
    </div>
  );
}

function UseCaseDetail({ scenario, lang, reduceMotion, detailRef }: UseCaseDetailProps) {
  return (
    <div
      ref={detailRef}
      id="usecase-panel"
      role="tabpanel"
      aria-labelledby={`usecase-tab-${scenario.id}`}
      className="flex-1 rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 md:p-6"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <h3 className="max-w-[58ch] text-xl font-medium text-white md:text-2xl">
            {scenario.title[lang]}
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                {lang === "cz" ? "Analýza" : "Analysis"}
              </p>
              <p className="mt-3 max-w-[58ch] text-sm text-white/70 leading-7 md:text-base">
                {scenario.analysis[lang]}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">
                {lang === "cz" ? "Výsledek" : "Result"}
              </p>
              <p className="mt-3 max-w-[58ch] text-sm text-white/70 leading-7 md:text-base">
                {scenario.result[lang]}
              </p>
            </div>
          </div>
          <SignalStrip pattern={scenario.signalPattern} reduceMotion={reduceMotion} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function UseCasesSection({
  heading,
  body,
  reduceMotion,
  lang,
  sectionTag,
  srSummary,
}: UseCasesProps) {
  const scenarios = useCases;
  const [activeId, setActiveId] = useState<UseCaseId>(scenarios[0]?.id ?? "antiFraud");
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const detailRef = useRef<HTMLDivElement>(null!);
  const hasMounted = useRef(false);

  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0],
    [activeId, scenarios]
  );

  const handleKey = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = scenarios.findIndex((scenario) => scenario.id === activeId);
      if (currentIndex === -1) {
        return;
      }
      const lastIndex = scenarios.length - 1;
      let nextIndex = currentIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = lastIndex;
      } else {
        return;
      }
      event.preventDefault();
      const nextId = scenarios[nextIndex].id;
      setActiveId(nextId);
      tabsRef.current[nextIndex]?.focus();
    },
    [activeId, scenarios]
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    if (!window.matchMedia("(max-width: 1023px)").matches) {
      return;
    }
    detailRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, [activeId, reduceMotion]);

  return (
    <Section id="use-cases" containerClassName="py-14 md:py-24" ariaLabelledBy="use-cases-heading">
      <div>
        <p data-reveal-item className="text-[11px] uppercase tracking-[0.3em] text-white/45 md:text-xs">
          {sectionTag}
        </p>
        <h2
          id="use-cases-heading"
          data-reveal-item
          className="mt-3 max-w-[68ch] text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>
        <p className="sr-only">{srSummary}</p>
        <p data-reveal-item className="mt-4 max-w-[68ch] text-sm text-white/70 leading-7 md:text-base">
          {body}
        </p>
      </div>
      <div data-reveal-item className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <UseCaseNav
            scenarios={scenarios}
            activeId={activeId}
            lang={lang}
            onSelect={setActiveId}
            onKeyDown={handleKey}
            tabsRef={tabsRef}
          />
          <UseCaseDetail
            scenario={activeScenario}
            lang={lang}
            reduceMotion={reduceMotion}
            detailRef={detailRef}
          />
        </div>
      </div>
    </Section>
  );
}
