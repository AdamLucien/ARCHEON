"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PillarId } from "../../content/types";
import { useReducedMotionPref } from "./motion/useReducedMotionPref";
import { useScrollSpy } from "./motion/useScrollSpy";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import Architecture from "./sections/Architecture";
import Pillars from "./sections/Pillars";
import UseCases from "./sections/UseCases";
import Implementation from "./sections/Implementation";
import Contact from "./sections/Contact";
import type { LanguageCode, LanguageContent } from "../../content/i18n/types";

const sectionIds = ["architecture", "pillars", "use-cases", "implementation", "contact"];

type PageShellProps = {
  lang: LanguageCode;
  content: LanguageContent;
};

export default function PageShell({ lang, content }: PageShellProps) {
  const reduceMotion = useReducedMotionPref();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [hoveredPillarId, setHoveredPillarId] = useState<PillarId | null>(null);
  const [pinnedPillarId, setPinnedPillarId] = useState<PillarId | null>(null);
  const [seenSections, setSeenSections] = useState<string[]>([]);
  const [calmMode, setCalmMode] = useState(false);
  const calmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    if (!activeSection) {
      return;
    }
    const timer = window.setTimeout(() => {
      setSeenSections((prev) =>
        prev.includes(activeSection) ? prev : [...prev, activeSection]
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      if (typeof document === "undefined") {
        return;
      }
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const current = doc.scrollTop;
      setProgress(total > 0 ? Math.min(1, Math.max(0, current / total)) : 0);
    };
    const onScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPinnedPillarId(null);
        setHoveredPillarId(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    if (calmMode) {
      document.body.classList.add("calm-mode");
    } else {
      document.body.classList.remove("calm-mode");
    }
  }, [calmMode]);

  useEffect(() => {
    return () => {
      if (calmTimerRef.current) {
        clearTimeout(calmTimerRef.current);
      }
      if (typeof document !== "undefined") {
        document.body.classList.remove("calm-mode");
      }
    };
  }, []);

  const triggerCalmMode = () => {
    setCalmMode(true);
    if (calmTimerRef.current) {
      clearTimeout(calmTimerRef.current);
    }
    calmTimerRef.current = setTimeout(() => {
      setCalmMode(false);
    }, 420);
  };

  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") {
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleContactCta = () => {
    triggerCalmMode();
    scrollToSection("contact");
  };

  const handleArchitectureCta = () => scrollToSection("architecture");

  const handleLanguageChange = (targetLang: LanguageCode) => {
    if (targetLang === lang) {
      return;
    }
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`/${targetLang}${hash}`);
  };

  return (
    <>
      <Navbar
        navSections={content.nav.sections}
        activeSection={activeSection}
        seenSections={seenSections}
        progress={progress}
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        navCtaLabel={content.nav.primaryCta}
        navCtaAriaLabel={content.a11y.navCtaLabel}
        navAriaLabel={content.a11y.navPrimaryLabel}
        onCta={handleContactCta}
        languageLabel={content.nav.languageLabel}
        menuLabel={content.labels.menu}
        closeLabel={content.labels.close}
        toggleNavLabel={content.labels.toggleNav}
        wordmarkLabel={content.a11y.wordmarkLabel}
      />
      <main aria-label={content.a11y.mainLabel}>
        <Hero
          content={content.hero}
          onPrimaryCta={handleContactCta}
          onSecondaryCta={handleArchitectureCta}
          reduceMotion={reduceMotion}
          srSummary={content.a11y.heroSummary}
          srDisclaimer={content.a11y.notGame}
          wordmarkAriaLabel={content.a11y.wordmarkLabel}
          primaryCtaAriaLabel={content.a11y.navCtaLabel}
        />
        <Architecture
          heading={content.architecture.heading}
          body={content.architecture.body}
          blocks={content.architecture.blocks}
          sectionTag={content.labels.architectureTag}
          reduceMotion={reduceMotion}
          lang={lang}
          srSummary={content.a11y.architectureSummary}
        />
        <Pillars
          heading={content.pillars.heading}
          body={content.pillars.body}
          pinnedPillarId={pinnedPillarId}
          hoveredPillarId={hoveredPillarId}
          onHoverPillar={(id) => setHoveredPillarId(id)}
          onPinPillar={(id) => setPinnedPillarId((prev) => (prev === id ? null : id))}
          reduceMotion={reduceMotion}
          lang={lang}
          sectionTag={content.labels.pillarsTag}
          logicLabel={content.pillars.logicLabel}
          mobileHint={content.pillars.mobileCausalHint}
          noxisHint={content.pillars.noxisHint}
          srSummary={content.a11y.pillarsSummary}
        />
        <UseCases
          heading={content.useCases.heading}
          body={content.useCases.body}
          reduceMotion={reduceMotion}
          lang={lang}
          sectionTag={content.labels.useCasesTag}
          srSummary={content.a11y.useCasesSummary}
          pinnedPillarId={pinnedPillarId}
          pinnedLabel={content.pillars.connectionLabel}
        />
        <Implementation
          heading={content.implementation.heading}
          intro={content.implementation.intro}
          steps={content.implementation.steps}
          labels={content.implementation.labels}
          reduceMotion={reduceMotion}
          sectionTag={content.labels.implementationTag}
          srSummary={content.a11y.implementationSummary}
        />
        <Contact
          closingLine={content.contact.closingLine}
          subline={content.contact.subline}
          cta={content.contact.cta}
          ctaNote={content.contact.ctaNote}
          email={content.contact.email}
          reduceMotion={reduceMotion}
          sectionTag={content.labels.contactTag}
          srSummary={content.a11y.contactSummary}
          ctaAriaLabel={content.a11y.contactCtaLabel}
        />
      </main>
      <Footer line={content.footer.line} ariaLabel={content.a11y.footerLabel} />
    </>
  );
}
