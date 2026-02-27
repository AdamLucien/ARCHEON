import type { IconProps } from "./icon-types";

export default function PillarInvestmentsIcon(props: IconProps) {
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
      <path d="M4 19.5h16" />
      <path d="M6.5 15.5 10 12l2.5 2.5L17.5 9.5" />
      <path d="M14.8 9.5h2.7v2.7" />
    </svg>
  );
}
