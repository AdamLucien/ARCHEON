"use client";

import { Section } from "../layout/Section";

export type ContactProps = {
  closingLine: string;
  subline: string;
  cta: string;
  ctaNote: string;
  email: string;
  reduceMotion: boolean;
  sectionTag: string;
  srSummary: string;
  ctaAriaLabel: string;
};

export default function Contact({
  closingLine,
  subline,
  cta,
  ctaNote,
  email,
  reduceMotion,
  sectionTag,
  srSummary,
  ctaAriaLabel,
}: ContactProps) {
  void reduceMotion;
  return (
    <Section id="contact" containerClassName="py-16 md:py-24" ariaLabelledBy="contact-heading">
      <div
        className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[60ch] text-center">
        <p data-reveal-item className="text-[11px] uppercase tracking-[0.3em] text-white/45 md:text-xs">
          {sectionTag}
        </p>
        <h2
          id="contact-heading"
          data-reveal-item
          className="mt-4 text-2xl font-medium leading-tight text-white md:text-3xl lg:text-4xl"
        >
          {closingLine}
        </h2>
        <p className="sr-only">{srSummary}</p>
        <p data-reveal-item className="mt-4 text-sm text-white/70 leading-7 md:text-base">
          {subline}
        </p>
        <div data-reveal-item className="mt-8 flex flex-col items-center gap-3">
          <a
            href={`mailto:${email}`}
            aria-label={ctaAriaLabel}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white/90 transition hover:border-white/30 hover:shadow-[0_0_18px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 md:text-xs"
          >
            {cta}
          </a>
          <p className="text-xs text-white/60 md:text-sm">{ctaNote}</p>
        </div>
        <div data-reveal-item className="mt-6">
          <a
            href={`mailto:${email}`}
            className="text-sm text-white/70 underline decoration-transparent underline-offset-4 transition hover:text-white/90 hover:decoration-white/60 md:text-base font-mono tracking-[0.12em]"
          >
            {email}
          </a>
        </div>
      </div>
    </Section>
  );
}
