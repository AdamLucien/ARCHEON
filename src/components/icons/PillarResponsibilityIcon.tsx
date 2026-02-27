import type { IconProps } from "./icon-types";

export default function PillarResponsibilityIcon(props: IconProps) {
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
      <path d="M12 3.5 5.5 6v5.5c0 4.2 2.6 7.5 6.5 9 3.9-1.5 6.5-4.8 6.5-9V6L12 3.5Z" />
      <path d="m9.5 12.5 1.8 1.8 3.2-3.2" />
    </svg>
  );
}
