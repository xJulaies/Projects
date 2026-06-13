import type { THeaderProps } from "../../../../../shared/atoms/headers/header.types";

export function HeroHeader({ title }: THeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-semibold text-hero-text">{title}</h1>
    </div>
  );
}
