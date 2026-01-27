import type { IconProps } from "./icon-types";

export default function PillarInfrastructureIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="10" y="34" width="44" height="12" rx="3" />
      <rect x="14" y="20" width="36" height="10" rx="3" />
      <rect x="18" y="8" width="28" height="8" rx="2" />
      <path d="M10 34l-4 10h52l-4-10" />
    </svg>
  );
}
