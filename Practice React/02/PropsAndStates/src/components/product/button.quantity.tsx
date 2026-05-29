import type { TQuantityButtonProps } from "../../types/button.types";

export function QuantityButton({ onClick, text }: TQuantityButtonProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <button onClick={onClick} className="btn btn-xs">
          {text}
        </button>
      </div>
    </>
  );
}
