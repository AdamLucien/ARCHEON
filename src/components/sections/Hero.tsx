"use client";

import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import Wordmark from "../brand/Wordmark";

type HeroContent = {
  kicker: string;
  heading: string;
  subclaim: string;
  body: string;
  bullets: string[];
  primaryCta: string;
  secondaryCta: string;
};

type HeroProps = {
  content: HeroContent;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  reduceMotion: boolean;
  srSummary: string;
  srDisclaimer: string;
  wordmarkAriaLabel: string;
  primaryCtaAriaLabel: string;
};

export default function Hero({
  content,
  onPrimaryCta,
  onSecondaryCta,
  reduceMotion,
  srSummary,
  srDisclaimer,
  wordmarkAriaLabel,
  primaryCtaAriaLabel,
}: HeroProps) {
  const wordmarkEase: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
  const wordmarkInitial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 14, clipPath: "inset(0 0 100% 0 round 12px)" };
  const wordmarkAnimate = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 12px)" };
  const wordmarkTransition = reduceMotion
    ? { duration: 0.2 }
    : { duration: 1.1, ease: wordmarkEase, delay: 0.15 };
  return (
    <Section
      id="hero"
      ariaLabelledBy="hero-heading"
      className="min-h-[calc(100vh-var(--navbar-height))]"
      containerClassName="pt-12 pb-16 md:pt-14 md:pb-24 lg:pb-28"
      showSeparator={false}
    >
      <div className="flex w-full items-start">
        <div className="max-w-none w-auto text-left">
          <motion.div
            data-reveal-item
            initial={wordmarkInitial}
            animate={wordmarkAnimate}
            transition={wordmarkTransition}
          >
            <Wordmark
              className="h-20 w-auto md:h-28 lg:h-32 mb-10 md:mb-12"
              ariaLabel={wordmarkAriaLabel}
            />
          </motion.div>
          <p data-reveal-item className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
            {content.kicker}
          </p>
          <h1
            id="hero-heading"
            data-reveal-item
            className="text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h1>
          <p className="sr-only">{srSummary}</p>
          <p className="sr-only">{srDisclaimer}</p>
          <p data-reveal-item className="mt-4 text-base text-white/80 md:text-lg">
            {content.subclaim}
          </p>
          <p data-reveal-item className="mt-6 max-w-2xl text-sm text-white/70 leading-7 md:text-base">
            {content.body}
          </p>
          <ul data-reveal-item className="mt-6 space-y-3 text-sm text-white/70 leading-7 md:text-base">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div data-reveal-item className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onPrimaryCta}
              aria-label={primaryCtaAriaLabel}
              className="hoverable rounded-[var(--radius-soft)] border border-foreground/70 bg-white/5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground transition hover:border-foreground hover:bg-white/10 focus-visible:outline-offset-4 md:text-xs"
            >
              {content.primaryCta}
            </button>
            <button
              onClick={onSecondaryCta}
              className="hoverable rounded-[var(--radius-soft)] border border-border/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary transition hover:text-foreground hover:border-foreground focus-visible:outline-offset-4 md:text-xs"
            >
              {content.secondaryCta}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
