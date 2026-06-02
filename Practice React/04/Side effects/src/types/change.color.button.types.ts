import type { TColor } from "./color.types";

export type TChangeColorButtonProps = {
  onClick: (color: TColor) => void;
  text: string;
  color: TColor;
};
