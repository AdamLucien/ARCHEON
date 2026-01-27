import type { IconProps } from "./icon-types";
import CitizensSvg from "../../../brand/pillar_icons/citizens.svg";

export default function PillarCitizensIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" as const };

  return <CitizensSvg {...props} {...ariaProps} focusable="false" />;
}
