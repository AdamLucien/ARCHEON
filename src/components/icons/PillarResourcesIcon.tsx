import type { IconProps } from "./icon-types";

export default function PillarResourcesIcon(props: IconProps) {
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
      <rect x="4" y="4" width="16" height="4" rx="1.5" />
      <rect x="4" y="10" width="16" height="4" rx="1.5" />
      <rect x="4" y="16" width="16" height="4" rx="1.5" />
    </svg>
  );
}
