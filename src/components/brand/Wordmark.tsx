import type { IconProps } from "../icons/icon-types";
import WordmarkSvg from "../../../brand/archeon-wordmark.svg";

type WordmarkProps = IconProps & {
  title?: string;
  ariaLabel?: string;
};

export default function Wordmark({ className, title, ariaLabel }: WordmarkProps) {
  const label = ariaLabel ?? title;
  const ariaProps = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": "true" as const };

  return <WordmarkSvg className={className} focusable="false" {...ariaProps} />;
}
