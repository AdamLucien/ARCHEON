import type { ReactNode } from "react";
import SectionSeparator from "./SectionSeparator";

export type SectionStaticProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  showSeparator?: boolean;
  ariaLabelledBy?: string;
};

export function SectionStatic({
  id,
  children,
  className = "",
  containerClassName = "py-16 md:py-24 lg:py-28",
  showSeparator = true,
  ariaLabelledBy,
}: SectionStaticProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative min-h-0 md:min-h-[360px] scroll-mt-[var(--navbar-height)] ${className}`}
      tabIndex={-1}
    >
      <div className="section-container relative">
        {showSeparator ? <SectionSeparator /> : null}
        <div className={containerClassName}>{children}</div>
      </div>
    </section>
  );
}
