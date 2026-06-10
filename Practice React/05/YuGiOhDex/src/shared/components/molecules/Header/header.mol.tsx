import type { THeaderProps } from "./header.types";

export function Header({ title, text }: THeaderProps) {
  return (
    <>
      <div className="hero bg-base-200 rounded-box mb-6">
        <div className="hero-content text-center flex flex-col gap-4 p-4 m-4">
          <h1 className="text-4xl">{title}</h1>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
