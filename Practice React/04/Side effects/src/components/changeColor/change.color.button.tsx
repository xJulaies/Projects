import type { TChangeColorButtonProps } from "../../types/change.color.button.types";

export function ChangeColorButton({
  onClick,
  text,
  color,
}: TChangeColorButtonProps) {
  return (
    <button onClick={() => onClick(color)} className="btn btn-primary">
      {text}
    </button>
  );
}
