import { SectionStatic } from "../layout/SectionStatic";
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
  srSummary: string;
  srDisclaimer: string;
  wordmarkAriaLabel: string;
  primaryCtaAriaLabel: string;
};

export default function Hero({
  content,
  srSummary,
  srDisclaimer,
  wordmarkAriaLabel,
  primaryCtaAriaLabel,
}: HeroProps) {
  return (
    <SectionStatic
      id="hero"
      ariaLabelledBy="hero-heading"
      className="min-h-[calc(100vh-var(--navbar-height))]"
      containerClassName="pt-12 pb-16 md:pt-14 md:pb-24 lg:pb-28"
      showSeparator={false}
    >
      <div className="flex w-full items-start">
        <div className="max-w-none w-auto text-left">
          <div>
            <Wordmark
              className="h-20 w-auto md:h-28 lg:h-32 mb-10 md:mb-12"
              ariaLabel={wordmarkAriaLabel}
              priority
            />
          </div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
            {content.kicker}
          </p>
          <h1
            id="hero-heading"
           
            className="text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h1>
          <p className="sr-only">{srSummary}</p>
          <p className="sr-only">{srDisclaimer}</p>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            {content.subclaim}
          </p>
          <p className="mt-6 max-w-2xl text-sm text-white/70 leading-7 md:text-base">
            {content.body}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70 leading-7 md:text-base">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              aria-label={primaryCtaAriaLabel}
              className="hoverable inline-flex min-h-[44px] items-center rounded-[var(--radius-soft)] border border-foreground/70 bg-white/5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground transition hover:border-foreground hover:bg-white/10 focus-visible:outline-offset-4 md:text-xs"
            >
              {content.primaryCta}
            </a>
            <a
              href="#architecture"
              className="hoverable inline-flex min-h-[44px] items-center rounded-[var(--radius-soft)] border border-border/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary transition hover:text-foreground hover:border-foreground focus-visible:outline-offset-4 md:text-xs"
            >
              {content.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </SectionStatic>
  );
}
