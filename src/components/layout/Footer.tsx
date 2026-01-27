type FooterProps = {
  line: string;
  ariaLabel: string;
};

export default function Footer({ line, ariaLabel }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0b0b0b]" role="contentinfo" aria-label={ariaLabel}>
      <div className="section-container py-12">
        <p className="text-[0.7rem] uppercase tracking-[var(--tracking-label)] text-foreground/80">
          {line}
        </p>
        <p className="mt-3 text-xs text-white/50">
          © {year} Lucien Systems LLC — Architect: Adam Karl Lucien
        </p>
      </div>
    </footer>
  );
}
