import type { THeaderProps } from "./header.types";

export function Header({ title }: THeaderProps) {
  return (
    <div className="flex justify-center mb-6 rounded-lg bg-surface-muted px-4 py-3">
      <h1 className="text-4xl font-semibold text-primary">{title}</h1>
    </div>
  );
}
