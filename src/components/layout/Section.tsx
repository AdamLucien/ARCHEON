"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import SectionSeparator from "./SectionSeparator";

export type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  showSeparator?: boolean;
  ariaLabelledBy?: string;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "py-16 md:py-24 lg:py-28",
  showSeparator = true,
  ariaLabelledBy,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || typeof window === "undefined") {
      return;
    }

    document.documentElement.dataset.reveal = "true";

    const items = Array.from(
      sectionEl.querySelectorAll<HTMLElement>("[data-reveal-item]")
    ).filter((item) => item.offsetParent !== null);

    if (!items.length) {
      return;
    }

    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 80}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          items.forEach((item) => item.classList.add("is-visible"));
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      ref={sectionRef}
      data-reveal="section"
      className={`relative min-h-0 md:min-h-[360px] scroll-mt-[var(--navbar-height)] ${className}`}
      tabIndex={-1}
    >
      <div className="section-container relative">
        {showSeparator ? (
          <SectionSeparator />
        ) : null}
        <div className={containerClassName}>{children}</div>
      </div>
    </section>
  );
}
