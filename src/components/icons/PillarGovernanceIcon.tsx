import type { IconProps } from "./icon-types";

export default function PillarGovernanceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M32 10L18 32l14 22 14-22L32 10z" />
      <line x1="26" y1="32" x2="26" y2="44" />
      <line x1="38" y1="32" x2="38" y2="44" />
      <line x1="18" y1="34" x2="46" y2="34" strokeLinecap="butt" />
    </svg>
  );
}
