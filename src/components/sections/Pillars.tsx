"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import clsx from "clsx";
import { pillars } from "../../../content/pillars";
import type { PillarDefinition } from "../../../content/pillars";
import type { PillarId } from "../../../content/types";
import { Section } from "../layout/Section";

import PillarResourcesIcon from "../icons/PillarResourcesIcon";
import PillarServicesIcon from "../icons/PillarServicesIcon";
import PillarCitizensIcon from "../icons/PillarCitizensIcon";
import PillarFamilyIcon from "../icons/PillarFamilyIcon";
import PillarCommunicationIcon from "../icons/PillarCommunicationIcon";
import PillarInvestmentsIcon from "../icons/PillarInvestmentsIcon";
import PillarResponsibilityIcon from "../icons/PillarResponsibilityIcon";
import type { ImageIconProps } from "../icons/icon-types";

type Language = "en" | "cz";

export type PillarsProps = {
  heading: string;
  body: string;
  pinnedPillarId: PillarId | null;
  hoveredPillarId: PillarId | null;
  onHoverPillar: (id: PillarId | null) => void;
  onPinPillar: (id: PillarId | null) => void;
  reduceMotion: boolean;
  lang: Language;
  sectionTag: string;
  mobileHint: string;
  noxisHint: string;
  logicLabel: string;
  srSummary: string;
};

const icons: Record<PillarDefinition["id"], React.ComponentType<ImageIconProps>> = {
  resources: PillarResourcesIcon,
  services: PillarServicesIcon,
  citizens: PillarCitizensIcon,
  family: PillarFamilyIcon,
  communication: PillarCommunicationIcon,
  investments: PillarInvestmentsIcon,
  responsibility: PillarResponsibilityIcon,
};

const relationships: Record<PillarId, PillarId[]> = {
  resources: ["services", "investments", "communication"],
  services: ["citizens", "family", "communication"],
  citizens: ["family", "communication"],
  family: ["citizens", "services"],
  communication: ["services", "investments", "responsibility"],
  investments: ["resources", "services", "responsibility"],
  responsibility: ["resources", "investments", "communication"],
};

const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function SevenPillarsSection({
  heading,
  body,
  pinnedPillarId,
  hoveredPillarId,
  onHoverPillar,
  onPinPillar,
  reduceMotion,
  lang,
  sectionTag,
  mobileHint,
  noxisHint,
  logicLabel,
  srSummary,
}: PillarsProps) {
  void reduceMotion;
  const sectionRef = useRef<HTMLDivElement>(null!);
  const activeId = pinnedPillarId ?? hoveredPillarId;

  useEffect(() => {
    if (!pinnedPillarId) {
      return;
    }
    const handlePointer = (event: PointerEvent) => {
      if (!sectionRef.current) {
        return;
      }
      if (!sectionRef.current.contains(event.target as Node)) {
        onPinPillar(null);
      }
    };
    window.addEventListener("pointerdown", handlePointer);
    return () => window.removeEventListener("pointerdown", handlePointer);
  }, [onPinPillar, pinnedPillarId]);

  const relatedMap = useMemo(() => relationships, []);

  return (
    <Section id="pillars" ariaLabelledBy="pillars-heading">
      <div ref={sectionRef}>
        <div>
          <p data-reveal-item className="text-[11px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
            {sectionTag}
          </p>
          <h2
            id="pillars-heading"
            data-reveal-item
            className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl"
          >
            {heading}
          </h2>
          <p className="sr-only">{srSummary}</p>
          <p data-reveal-item className="mt-4 max-w-2xl text-sm text-white/70 leading-7 md:text-base">{body}</p>
        </div>
        <div data-reveal-item className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = icons[pillar.id];
            const isHovered = hoveredPillarId === pillar.id;
            const isPinned = pinnedPillarId === pillar.id;
            const isActive = activeId === pillar.id;
            const isRelated = Boolean(activeId && relatedMap[activeId].includes(pillar.id));
            const isDimmed = Boolean(activeId && !isActive && !isRelated);
            const baseAccent = hexToRgba(pillar.color, 0.35);
            const strongAccent = hexToRgba(pillar.color, 0.78);
            const glowAccent = hexToRgba(pillar.color, 0.22);
            const borderColor = isActive || isRelated ? strongAccent : baseAccent;
            const iconColor = isActive || isRelated ? strongAccent : baseAccent;
            const overlayOpacity = isActive ? 0.22 : isHovered ? 0.18 : isRelated ? 0.12 : 0;
            const edgeOpacity = isActive ? 0.6 : isHovered ? 0.45 : isRelated ? 0.3 : 0;

            return (
              <button
                key={pillar.id}
                data-related={relatedMap[pillar.id].join(",")}
                data-affects={relatedMap[pillar.id].join(",")}
                onMouseEnter={() => onHoverPillar(pillar.id)}
                onMouseLeave={() => onHoverPillar(null)}
                onFocus={() => onHoverPillar(pillar.id)}
                onBlur={() => onHoverPillar(null)}
                onClick={() => onPinPillar(isPinned ? null : pillar.id)}
                className={clsx(
                  "group relative flex h-full min-h-[220px] flex-col rounded-[18px] border bg-[#0b0b0b] p-6 text-left transition-[transform,opacity] duration-150 ease-out",
                  "will-change-transform transform-gpu motion-reduce:transition-none motion-reduce:transform-none",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--pill)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]",
                  { "opacity-85": isDimmed },
                  { "-translate-y-0.5": (isActive || isHovered) && !reduceMotion }
                )}
                style={{
                  "--pill": pillar.color,
                  borderColor,
                } as CSSProperties}
                aria-pressed={isPinned}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-150 ease-out"
                  style={{
                    opacity: overlayOpacity,
                    background: `radial-gradient(140px 140px at 20% 20%, ${glowAccent} 0%, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-y-3 left-0 w-px bg-[color:var(--pill)] opacity-0 transition-opacity duration-150 ease-out"
                  style={{ opacity: edgeOpacity }}
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/5 bg-[#0c0c0c]"
                    style={{ color: iconColor }}
                  >
                    <Icon className="h-6 w-6" alt={pillar.names[lang]} />
                  </span>
                  {pillar.id === "communication" ? (
                    <span
                      className={clsx(
                        "flex items-center gap-1 text-white/40 opacity-0 transition-opacity duration-150",
                        { "opacity-100": isActive || isHovered }
                      )}
                      aria-hidden="true"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                    </span>
                  ) : null}
                </div>
                <div className="mt-4">
                  <p className="text-lg font-medium text-white">{pillar.names.cz}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/50">
                    {pillar.names.en}
                  </p>
                  <p className="mt-3 text-sm text-white/70 leading-7">{pillar.descriptions[lang]}</p>
                  <p className="mt-3 text-[11px] italic text-white/50">
                    {logicLabel}: {pillar.logic[lang]}
                  </p>
                  {pillar.id === "communication" && (isActive || isHovered) ? (
                    <p className="mt-3 text-xs text-white/50">{noxisHint}</p>
                  ) : null}
                  {isActive ? (
                    <p className="mt-4 text-xs text-white/60 md:hidden">{mobileHint}</p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
