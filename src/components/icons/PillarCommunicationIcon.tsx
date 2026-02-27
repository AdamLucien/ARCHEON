import type { IconProps } from "./icon-types";

export default function PillarCommunicationIcon(props: IconProps) {
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
      <path d="M4 6.5h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" />
      <path d="M9 10.5h5M9 13h3" />
    </svg>
  );
}
