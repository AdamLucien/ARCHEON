"use client";

import { useEffect } from "react";

type RumVitalsProps = {
  lang: "en" | "cz";
};

type RumPayload = {
  metric: "FCP" | "LCP" | "CLS" | "INP" | "TTFB";
  value: number;
  path: string;
  lang: "en" | "cz";
  ts: number;
};

type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

type EventTimingEntry = PerformanceEntry & {
  duration: number;
  interactionId: number;
};

const endpoint = process.env.NEXT_PUBLIC_RUM_ENDPOINT;

export default function RumVitals({ lang }: RumVitalsProps) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") {
      return;
    }
    if (!endpoint) {
      return;
    }

    const path = window.location.pathname;
    const observers: PerformanceObserver[] = [];

    const sendMetric = (payload: RumPayload) => {
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, body);
        return;
      }
      void fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: true,
      });
    };

    const send = (metric: RumPayload["metric"], value: number) => {
      if (!Number.isFinite(value) || value < 0) {
        return;
      }
      sendMetric({
        metric,
        value: Math.round(value * 100) / 100,
        path,
        lang,
        ts: Date.now(),
      });
    };

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.responseStart) {
      send("TTFB", nav.responseStart);
    }

    let clsValue = 0;
    let lcpValue = 0;
    let inpValue = 0;
    let fcpSent = false;

    const addObserver = (
      type: string,
      callback: (list: PerformanceObserverEntryList) => void,
      buffered = true
    ) => {
      try {
        const observer = new PerformanceObserver(callback);
        observer.observe({ type, buffered });
        observers.push(observer);
      } catch {
        // Unsupported entry type in this browser.
      }
    };

    addObserver("paint", (list) => {
      if (fcpSent) {
        return;
      }
      const fcp = list.getEntries().find((entry) => entry.name === "first-contentful-paint");
      if (fcp) {
        send("FCP", fcp.startTime);
        fcpSent = true;
      }
    });

    addObserver("largest-contentful-paint", (list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        lcpValue = Math.max(lcpValue, last.startTime);
      }
    });

    addObserver("layout-shift", (list) => {
      for (const entry of list.getEntries() as LayoutShiftEntry[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });

    addObserver("event", (list) => {
      for (const entry of list.getEntries() as EventTimingEntry[]) {
        if (entry.interactionId > 0) {
          inpValue = Math.max(inpValue, entry.duration);
        }
      }
    });

    const flush = () => {
      send("LCP", lcpValue);
      send("CLS", clsValue);
      send("INP", inpValue);
    };

    const onHidden = () => {
      if (document.visibilityState === "hidden") {
        flush();
      }
    };

    document.addEventListener("visibilitychange", onHidden, { passive: true });
    window.addEventListener("pagehide", flush, { passive: true });

    return () => {
      document.removeEventListener("visibilitychange", onHidden);
      window.removeEventListener("pagehide", flush);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [lang]);

  return null;
}
