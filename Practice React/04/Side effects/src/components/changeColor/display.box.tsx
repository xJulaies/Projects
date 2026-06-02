import type { TDisplayBoxProps } from "../../types/display.box.types";

export function DisplayBox({ boxColor }: TDisplayBoxProps) {
  return <div className={`${boxColor} w-16 h-16`}></div>;
}
