import type { TDisplayName } from "../../types/names.types";

export function DisplayName({ name }: TDisplayName) {
  return (
    <p className="bg-base-100 border border-blue-300 rounded-lg p-8 m-8 text-center text-2xl">
      {name}
    </p>
  );
}
