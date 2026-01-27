import type { IconProps } from "./icon-types";

export default function PillarInformationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 32c12-14 40-14 52 0-12 14-40 14-52 0z" />
      <circle cx="32" cy="32" r="8" />
      <line x1="32" y1="18" x2="32" y2="26" />
      <line x1="32" y1="38" x2="32" y2="46" />
    </svg>
  );
}
