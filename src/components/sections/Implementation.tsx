"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, MutableRefObject, RefObject } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "../layout/Section";

export type ImplementationStep = {
  id: string;
  title: string;
  summary: string;
  what: string[];
  why: string;
  stageLabel: string;
  signalPattern: number[];
};

export type ImplementationProps = {
  heading: string;
  intro: string;
  steps: ImplementationStep[];
  labels: {
    what: string;
    why: string;
  };
  reduceMotion: boolean;
  sectionTag: string;
  srSummary: string;
};

type StepsProps = {
  steps: ImplementationStep[];
  activeId: string;
  onSelect: (id: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  tabsRef: MutableRefObject<Array<HTMLButtonElement | null>>;
};

type DetailProps = {
  step: ImplementationStep;
  labels: ImplementationProps["labels"];
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

function ImplementationSteps({ steps, activeId, onSelect, onKeyDown, tabsRef }: StepsProps) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
      role="tablist"
      aria-label="Implementation steps"
      onKeyDown={onKeyDown}
    >
      {steps.map((step, index) => {
        const isActive = step.id === activeId;
        return (
          <button
            key={step.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            role="tab"
            id={`implementation-tab-${step.id}`}
            aria-selected={isActive}
            aria-controls="implementation-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(step.id)}
            className={clsx(
              "group relative flex h-full min-h-[220px] w-[85%] min-w-[240px] flex-col rounded-2xl border bg-[#0b0b0b] p-5 text-left transition-all",
              "snap-start lg:w-auto lg:min-w-0 lg:snap-none",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50",
              isActive
                ? "border-white/20 bg-gradient-to-b from-white/[0.06] to-transparent text-white shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                : "border-white/10 text-white/70 hover:border-white/18 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-[11px] font-semibold text-white/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-medium text-white md:text-lg">{step.title}</h3>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-7">{step.summary}</p>
            <div className="mt-auto pt-6">
              <div className="inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/45">
                {step.stageLabel}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ImplementationDetail({ step, labels, reduceMotion, detailRef }: DetailProps) {
  return (
    <div
      ref={detailRef}
      id="implementation-panel"
      role="tabpanel"
      aria-labelledby={`implementation-tab-${step.id}`}
      className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 md:p-7"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">{labels.what}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70 leading-7 md:text-base">
                {step.what.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/30" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">{labels.why}</p>
              <p className="mt-4 text-sm text-white/70 leading-7 md:text-base">{step.why}</p>
              <SignalStrip pattern={step.signalPattern} reduceMotion={reduceMotion} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Implementation({
  heading,
  intro,
  steps,
  labels,
  reduceMotion,
  sectionTag,
  srSummary,
}: ImplementationProps) {
  const [activeId, setActiveId] = useState<string>(steps[0]?.id ?? "step-1");
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const detailRef = useRef<HTMLDivElement>(null!);
  const hasMounted = useRef(false);

  const activeStep = useMemo(
    () => steps.find((step) => step.id === activeId) ?? steps[0],
    [activeId, steps]
  );

  const handleKey = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = steps.findIndex((step) => step.id === activeId);
      if (currentIndex === -1) {
        return;
      }
      const lastIndex = steps.length - 1;
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
      const nextId = steps[nextIndex].id;
      setActiveId(nextId);
      tabsRef.current[nextIndex]?.focus();
    },
    [activeId, steps]
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
    <Section id="implementation" containerClassName="py-16 md:py-24" ariaLabelledBy="implementation-heading">
      <div>
        <p data-reveal-item className="text-[11px] uppercase tracking-[0.3em] text-white/45 md:text-xs">
          {sectionTag}
        </p>
        <h2
          id="implementation-heading"
          data-reveal-item
          className="mt-3 max-w-[68ch] text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>
        <p className="sr-only">{srSummary}</p>
        <p data-reveal-item className="mt-4 max-w-[68ch] text-sm text-white/70 leading-7 md:text-base">
          {intro}
        </p>
      </div>
      <div className="mt-8">
        <div data-reveal-item>
          <ImplementationSteps
            steps={steps}
            activeId={activeId}
            onSelect={setActiveId}
            onKeyDown={handleKey}
            tabsRef={tabsRef}
          />
          <div className="mt-4 flex items-center justify-center gap-2 lg:hidden" aria-hidden="true">
            {steps.map((step) => (
              <span
                key={step.id}
                className={clsx(
                  "h-1.5 w-1.5 rounded-full bg-white/30 transition-opacity",
                  step.id === activeId ? "opacity-100" : "opacity-40"
                )}
              />
            ))}
          </div>
        </div>
        {activeStep ? (
          <div data-reveal-item className="mt-8">
            <ImplementationDetail
              step={activeStep}
              labels={labels}
              reduceMotion={reduceMotion}
              detailRef={detailRef}
            />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
