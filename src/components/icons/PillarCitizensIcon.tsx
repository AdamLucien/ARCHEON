import type { IconProps } from "./icon-types";

export default function PillarCitizensIcon(props: IconProps) {
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
      <circle cx="12" cy="8" r="3" />
      <path d="M5.5 19.5c1.7-3 3.9-4.5 6.5-4.5s4.8 1.5 6.5 4.5" />
    </svg>
  );
}
