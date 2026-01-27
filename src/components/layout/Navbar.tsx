"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import type { Variants } from "framer-motion";
import Wordmark from "../brand/Wordmark";
import { useReducedMotionPref } from "../motion/useReducedMotionPref";
import { createMenuVariant, createProgressVariant } from "../motion/variants";

type SectionNav = {
  id: string;
  label: string;
};

export type NavbarProps = {
  navSections: SectionNav[];
  activeSection: string;
  seenSections: string[];
  progress: number;
  currentLang: "en" | "cz";
  onLanguageChange: (lang: "en" | "cz") => void;
  navCtaLabel: string;
  navAriaLabel: string;
  navCtaAriaLabel: string;
  onCta: () => void;
  languageLabel: string;
  menuLabel: string;
  closeLabel: string;
  toggleNavLabel: string;
  wordmarkLabel: string;
};

export default function Navbar({
  navSections,
  activeSection,
  seenSections,
  progress,
  currentLang,
  onLanguageChange,
  navCtaLabel,
  navAriaLabel,
  navCtaAriaLabel,
  onCta,
  languageLabel,
  menuLabel,
  closeLabel,
  toggleNavLabel,
  wordmarkLabel,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotionPref();
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0, ready: false });

  const progressVariant: Variants = useMemo(
    () => createProgressVariant(prefersReducedMotion),
    [prefersReducedMotion]
  );

  useEffect(() => {
    if (!menuOpen) {
      menuToggleRef.current?.focus();
      return;
    }

    const node = menuRef.current;
    if (!node) {
      return;
    }

    const focusable = Array.from(
      node.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )
    ).filter((el) => !el.hasAttribute("disabled"));

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    firstFocusable?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length <= 1) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
        return;
      }

      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.removeProperty("overflow");
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const toggleLang = (lang: "en" | "cz") => {
    if (lang === currentLang) {
      return;
    }
    setMenuOpen(false);
    onLanguageChange(lang);
  };

  const navTrackingClass = currentLang === "en" ? "tracking-[0.20em]" : "tracking-[0.26em]";

  const updateUnderline = useCallback(() => {
    const navNode = navRef.current;
    const linkNode = linkRefs.current[activeSection];
    if (!navNode || !linkNode) {
      return;
    }
    const navRect = navNode.getBoundingClientRect();
    const linkRect = linkNode.getBoundingClientRect();
    const nextLeft = linkRect.left - navRect.left;
    const nextWidth = linkRect.width;
    setUnderline({ left: nextLeft, width: nextWidth, ready: true });
  }, [activeSection]);

  useEffect(() => {
    updateUnderline();
  }, [activeSection, updateUnderline, navSections]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleResize = () => updateUnderline();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateUnderline]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-[rgba(10,10,10,0.96)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-[rgba(255,255,255,0.2)]">
        <motion.span
          className="block h-px w-full origin-left bg-foreground"
          style={{ transformOrigin: "left" }}
          initial="visible"
          animate="visible"
          variants={progressVariant}
          custom={progress}
        />
      </div>
      <nav
        className="section-container relative z-10 flex h-16 w-full items-center"
        role="navigation"
        aria-label={navAriaLabel}
      >
        <div className="flex items-center flex-shrink-0 pr-6 md:pr-8">
          <Wordmark className="relative z-10 h-6 w-auto md:h-7" ariaLabel={wordmarkLabel} />
          <span className="sr-only">{wordmarkLabel}</span>
        </div>
        <div className="hidden md:flex flex-1 justify-center min-w-0 max-w-[680px] mx-auto">
          <div
            ref={navRef}
            className={clsx(
              "relative flex items-center whitespace-nowrap gap-x-5 lg:gap-x-7 text-[11px] uppercase text-white/70 md:text-xs",
              navTrackingClass
            )}
          >
            <span
              aria-hidden="true"
              className={clsx(
                "absolute -bottom-1 h-px bg-white/80",
                prefersReducedMotion
                  ? ""
                  : "transition-[transform,width] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              )}
              style={{
                width: underline.width,
                transform: `translateX(${underline.left}px)`,
                opacity: underline.ready ? 1 : 0,
              }}
            />
            {navSections.map((section) => {
              const isActive = section.id === activeSection;
              const seen = seenSections.includes(section.id);
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  ref={(el) => {
                    linkRefs.current[section.id] = el;
                  }}
                  className={clsx(
                    "flex items-center gap-2 text-[11px] uppercase text-white/70 transition-colors duration-200 hover:text-white/90 md:text-xs",
                    isActive ? "text-white" : "text-white/70"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {section.label}
                  <span
                    className={clsx(
                      "h-1 w-1 rounded-full transition-all duration-200",
                      seen ? "bg-foreground/70" : "bg-transparent",
                      isActive ? "scale-100" : "scale-75"
                    )}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>
        <div className="hidden md:flex items-center flex-shrink-0 gap-x-4">
          <div
            className={clsx(
              "flex items-center gap-3 border-l border-border/50 pl-4 text-[11px] font-medium uppercase text-white/60 md:text-xs",
              navTrackingClass
            )}
            role="group"
            aria-label={languageLabel}
          >
            {(["cz", "en"] as const).map((langCode) => (
              <button
                key={langCode}
                onClick={() => toggleLang(langCode)}
                className={clsx(
                  "px-1 py-1",
                  currentLang === langCode ? "text-white" : "text-white/60 hover:text-white/90"
                )}
                aria-pressed={currentLang === langCode}
              >
                {langCode.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={onCta}
            aria-label={navCtaAriaLabel}
            className="hoverable rounded-[var(--radius-soft)] border border-border/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/75 transition hover:border-foreground hover:text-foreground md:px-5 md:py-2.5 md:text-xs"
          >
            {navCtaLabel}
          </button>
        </div>
        <div className="ml-auto flex items-center gap-3 md:hidden">
          <button
            ref={menuToggleRef}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={toggleNavLabel}
            className="hoverable rounded-[var(--radius-soft)] border border-border/60 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[var(--tracking-label)] text-foreground"
          >
            {menuLabel}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-[rgba(18,18,18,0.95)]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={createMenuVariant(prefersReducedMotion)}
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            id="mobile-menu"
          >
            <div className="flex h-full flex-col gap-8 px-6 pt-10">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="hoverable text-[var(--text-label)] font-semibold uppercase tracking-[var(--tracking-label)] text-secondary"
                >
                  {closeLabel}
                </button>
              </div>
              <div className="flex flex-col gap-6 text-xl font-semibold uppercase tracking-[var(--tracking-label)] text-foreground">
                {navSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {section.label}
                  </a>
                ))}
              </div>
              <div
                className="flex flex-col gap-3 text-[var(--text-label)] font-semibold uppercase tracking-[var(--tracking-label)] text-secondary"
                role="group"
                aria-label={languageLabel}
              >
                {(["cz", "en"] as const).map((langCode) => (
                  <button
                    key={langCode}
                    onClick={() => toggleLang(langCode)}
                    className={clsx(
                      "text-left",
                      currentLang === langCode ? "text-foreground" : "text-secondary"
                    )}
                    aria-pressed={currentLang === langCode}
                  >
                    {langCode.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  onCta();
                  setMenuOpen(false);
                }}
                aria-label={navCtaAriaLabel}
                className="hoverable mt-auto rounded-[var(--radius-soft)] border border-border/60 px-6 py-3 text-[var(--text-label)] font-semibold uppercase tracking-[var(--tracking-label)] text-foreground"
              >
                {navCtaLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
