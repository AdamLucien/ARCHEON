type SectionSeparatorProps = {
  className?: string;
};

export default function SectionSeparator({ className = "" }: SectionSeparatorProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-80 ${className}`}
      aria-hidden="true"
    />
  );
}
