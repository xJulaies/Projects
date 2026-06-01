import type { TRandomizeButtonProps } from "../../types/button.types";

export function RandomizeButton({ onClick, text }: TRandomizeButtonProps) {
  return (
    <>
      <div className="flex justify-center">
        <button onClick={onClick} className="btn btn-primary btn-xl p-8 m-8">
          {text}
        </button>
      </div>
    </>
  );
}
