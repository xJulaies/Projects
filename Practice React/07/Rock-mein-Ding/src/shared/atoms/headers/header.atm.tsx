import type { THeaderProps } from "./header.types";

export function Header({ title }: THeaderProps) {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-6xl justify-center px-4 py-4 text-center">
      <h1 className="new-rocker-regular text-3xl text-foreground md:text-4xl">
        {title}
      </h1>
    </div>
  );
}
