import iconImage from "/public/images/icon.png";
import type { TDisplayIconProps } from "./icon.types";

export function DisplayIcon({ iconClassName }: TDisplayIconProps) {
  return (
    <img src={iconImage} alt="rock mein ding logo" className={iconClassName} />
  );
}
