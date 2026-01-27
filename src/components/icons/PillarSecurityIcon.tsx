import type { IconProps } from "./icon-types";

export default function PillarSecurityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M32 8L12 18v16c0 14 10 24 20 26 10-2 20-12 20-26V18L32 8z" />
      <circle cx="32" cy="30" r="6" />
      <path d="M32 36v10" />
    </svg>
  );
}
