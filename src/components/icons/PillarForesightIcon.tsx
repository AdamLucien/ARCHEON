import type { IconProps } from "./icon-types";

export default function PillarForesightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 44h44" />
      <path d="M16 34l10-10 10 10" />
      <path d="M52 24l-8 8-4-4" />
      <line x1="32" y1="20" x2="32" y2="44" />
      <line x1="26" y1="28" x2="38" y2="28" />
    </svg>
  );
}
