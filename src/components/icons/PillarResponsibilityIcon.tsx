import type { IconProps } from "./icon-types";
import ResponsibilitySvg from "../../../brand/pillar_icons/responsibility.svg";

export default function PillarResponsibilityIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" as const };

  return <ResponsibilitySvg {...props} {...ariaProps} focusable="false" />;
}
