import type { TDisplayContentProps } from "./textContent.types";
export function DisplayTextContent({ content }: TDisplayContentProps) {
  return (
    <div className="max-w-xl rounded-md border border-border bg-overlay/90 px-4 py-3 text-overlay-foreground shadow-overlay backdrop-blur-sm">
      <p>{content}</p>
    </div>
  );
}
