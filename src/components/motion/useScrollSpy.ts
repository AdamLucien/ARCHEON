"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Options = IntersectionObserverInit;

export function useScrollSpy(sectionIds: string[], options?: Options) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0]);
  const activeRef = useRef(activeId);
  const rafRef = useRef<number | null>(null);

  const mergedOptions: IntersectionObserverInit = useMemo(() => {
    const thresholds =
      options?.threshold ??
      Array.from({ length: 11 }, (_, index) => index / 10);
    return {
      rootMargin: "-40% 0px -50% 0px",
      threshold: thresholds,
      ...options,
    };
  }, [options]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const entries = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!entries.length) {
      return;
    }

    const observer = new IntersectionObserver((observed) => {
      const visible = observed.filter((entry) => entry.isIntersecting);
      if (visible.length) {
        const highest = visible.reduce((prev, current) =>
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        const nextId = highest.target.id;
        if (nextId !== activeRef.current) {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
          rafRef.current = requestAnimationFrame(() => {
            activeRef.current = nextId;
            setActiveId(nextId);
          });
        }
        return;
      }

      const sorted = observed
        .filter((entry) => entry.boundingClientRect.top <= 0)
        .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);

      if (sorted.length) {
        const nextId = sorted[0].target.id;
        if (nextId !== activeRef.current) {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
          rafRef.current = requestAnimationFrame(() => {
            activeRef.current = nextId;
            setActiveId(nextId);
          });
        }
      }
    }, mergedOptions);

    entries.forEach((entry) => observer.observe(entry));

    return () => {
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionIds, mergedOptions]);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);

  return activeId;
}
