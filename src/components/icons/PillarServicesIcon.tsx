/* eslint-disable @next/next/no-img-element */

import type { ImageIconProps } from "./icon-types";

const ICON_SRC = "/brand/pillar_icons/services.svg";

export default function PillarServicesIcon({
  alt,
  "aria-label": ariaLabel,
  ...props
}: ImageIconProps) {
  const label = ariaLabel ?? alt ?? "";
  const ariaProps = label ? { "aria-label": label } : { "aria-hidden": "true" as const };

  return <img src={ICON_SRC} alt={label} {...props} {...ariaProps} />;
}
