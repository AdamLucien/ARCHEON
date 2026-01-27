import type { IconProps } from "./icon-types";
import CommunicationSvg from "../../../brand/pillar_icons/communication.svg";

export default function PillarCommunicationIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const ariaProps = ariaLabel
    ? { role: "img", "aria-label": ariaLabel }
    : { "aria-hidden": "true" as const };

  return <CommunicationSvg {...props} {...ariaProps} focusable="false" />;
}
