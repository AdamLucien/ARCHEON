import type { IconProps } from "./icon-types";

export default function PillarSocietyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="20" cy="24" r="6" />
      <circle cx="44" cy="24" r="6" />
      <circle cx="32" cy="40" r="6" />
      <path d="M14 44h36" strokeLinecap="butt" />
      <path d="M20 30l8 6 8-6" />
    </svg>
  );
}
