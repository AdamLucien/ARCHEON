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
        <div className="mt-4 grid gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:flex sm:flex-wrap sm:gap-x-4 sm:gap-y-2 sm:text-[11px] sm:tracking-[0.22em]">
          <a
            href="https://lucien.technology"
            target="_blank"
            rel="noreferrer"
            className="w-fit break-all transition-colors hover:text-white/80 focus-visible:outline-offset-4 sm:break-normal"
          >
            lucien.technology
          </a>
          <a
            href="https://portal.lucien.technology"
            target="_blank"
            rel="noreferrer"
            className="w-fit break-all transition-colors hover:text-white/80 focus-visible:outline-offset-4 sm:break-normal"
          >
            portal.lucien.technology
          </a>
          <a
            href="https://adamkarl.lucien.technology"
            target="_blank"
            rel="noreferrer"
            className="w-fit break-all transition-colors hover:text-white/80 focus-visible:outline-offset-4 sm:break-normal"
          >
            adamkarl.lucien.technology
          </a>
        </div>
        <p className="mt-3 text-xs text-white/50">
          © {year} Lucien Technology — Architect: Adam Karl Lucien
        </p>
      </div>
    </footer>
  );
}
