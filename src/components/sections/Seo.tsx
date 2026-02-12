"use client";

import { Section } from "../layout/Section";

type SeoSectionProps = {
  heading: string;
  body: string[];
  sectionTag: string;
};

export default function SeoSection({ heading, body, sectionTag }: SeoSectionProps) {
  return (
    <Section id="system-overview" containerClassName="py-16 md:py-24" ariaLabelledBy="system-overview-heading">
      <div>
        <p data-reveal-item className="text-[11px] uppercase tracking-[0.3em] text-white/45 md:text-xs">
          {sectionTag}
        </p>
        <h2
          id="system-overview-heading"
          data-reveal-item
          className="mt-3 max-w-[68ch] text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>
        <div className="mt-4 space-y-4">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} data-reveal-item className="text-sm text-white/70 leading-7 md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
