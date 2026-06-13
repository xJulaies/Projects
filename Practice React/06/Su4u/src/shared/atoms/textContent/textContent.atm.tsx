import type { TDisplayContentProps } from "./textContent.types";
export function DisplayTextContent({
  content,
  className = "text-primary",
}: TDisplayContentProps) {
  return (
    <div className={`max-w-xl px-8 py-4 text-xl font-semibold ${className}`}>
      <p className="whitespace-pre-line">{content}</p>
    </div>
  );
}
