import type { IconProps } from "./icon-types";
import InvestmentsSvg from "../../../brand/pillar_icons/investments.svg";

export default function PillarInvestmentsIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" as const };

  return <InvestmentsSvg {...props} {...ariaProps} focusable="false" />;
}
