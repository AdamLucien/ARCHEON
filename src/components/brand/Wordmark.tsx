/* eslint-disable @next/next/no-img-element */
import type { IconProps } from "../icons/icon-types";

const WORDMARK_SRC = "/brand/archeon-wordmark.svg";
const WORDMARK_WIDTH = 152;
const WORDMARK_HEIGHT = 35;

type WordmarkProps = IconProps & {
  title?: string;
  ariaLabel?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function Wordmark({
  className,
  title,
  ariaLabel,
  priority = false,
  loading,
  fetchPriority,
}: WordmarkProps) {
  const label = ariaLabel ?? title;
  const alt = label ?? "";
  const ariaHidden = label ? undefined : true;
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : "auto");

  return (
    <img
      src={WORDMARK_SRC}
      width={WORDMARK_WIDTH}
      height={WORDMARK_HEIGHT}
      className={className}
      alt={alt}
      aria-hidden={ariaHidden}
      loading={resolvedLoading}
      fetchPriority={resolvedFetchPriority}
      decoding="async"
    />
  );
}
