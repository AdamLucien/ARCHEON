import type { IconProps } from "./icon-types";
import ServicesSvg from "../../../brand/pillar_icons/services.svg";

export default function PillarServicesIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" as const };

  return <ServicesSvg {...props} {...ariaProps} focusable="false" />;
}
