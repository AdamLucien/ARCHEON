import type { IconProps } from "./icon-types";
import FamilySvg from "../../../brand/pillar_icons/family.svg";

export default function PillarFamilyIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" as const };

  return <FamilySvg {...props} {...ariaProps} focusable="false" />;
}
