import type { IconProps } from "./icon-types";

export default function PillarFamilyIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <circle cx="12" cy="13" r="2" />
      <path d="M3.5 19.5c1.1-2.3 2.6-3.5 4.5-3.5M20.5 19.5c-1.1-2.3-2.6-3.5-4.5-3.5M8.5 19.5c1-1.7 2.2-2.5 3.5-2.5s2.5.8 3.5 2.5" />
    </svg>
  );
}
