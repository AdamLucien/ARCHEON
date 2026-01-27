import type { IconProps } from "./icon-types";
import WordmarkSvg from "../../../brand/archeon-wordmark.svg";

type LogoProps = IconProps & {
  title?: string;
};

export default function LogoArchEon({ className, title }: LogoProps) {
  const ariaProps = title
    ? { role: "img", "aria-label": title }
    : { "aria-hidden": "true" as const };

  return (
    <WordmarkSvg
      className={className}
      focusable="false"
      {...ariaProps}
    />
  );
}
