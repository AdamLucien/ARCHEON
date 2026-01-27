import type { IconProps } from "./icon-types";

export default function PillarEconomyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="44" r="4" />
      <circle cx="32" cy="20" r="4" />
      <circle cx="46" cy="44" r="4" />
      <path d="M18 44l14-24 14 24" />
      <rect x="20" y="46" width="24" height="10" rx="2" />
    </svg>
  );
}
