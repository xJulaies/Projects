import type { TDisplayIconProps } from "./icon.types";

export function DisplayIcon({ iconClassName, img, alt }: TDisplayIconProps) {
  return <img src={img} alt={alt} className={iconClassName} />;
}
