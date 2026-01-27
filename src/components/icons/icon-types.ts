import type { ImgHTMLAttributes, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

export type ImageIconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  className?: string;
};
