import type { THeaderProps } from "./header.types";

export function Header({ title }: THeaderProps) {
  return (
    <div className="mb-6 flex justify-center px-4 py-3 text-center">
      <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
    </div>
  );
}
