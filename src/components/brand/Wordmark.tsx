/* eslint-disable @next/next/no-img-element */
import type { IconProps } from "../icons/icon-types";

const WORDMARK_SRC = "/brand/archeon-wordmark.svg";

type WordmarkProps = IconProps & {
  title?: string;
  ariaLabel?: string;
};

export default function Wordmark({ className, title, ariaLabel }: WordmarkProps) {
  const label = ariaLabel ?? title;
  const alt = label ?? "";
  const ariaHidden = label ? undefined : true;

  return (
    <img
      src={WORDMARK_SRC}
      className={className}
      alt={alt}
      aria-hidden={ariaHidden}
    />
  );
}
