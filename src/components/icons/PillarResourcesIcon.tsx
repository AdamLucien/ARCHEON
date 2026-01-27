import type { IconProps } from "./icon-types";
import ResourcesSvg from "../../../brand/pillar_icons/resources.svg";

export default function PillarResourcesIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" as const };

  return <ResourcesSvg {...props} {...ariaProps} focusable="false" />;
}
