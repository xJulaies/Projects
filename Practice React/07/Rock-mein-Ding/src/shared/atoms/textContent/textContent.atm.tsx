import type { TDisplayContentProps } from "./textContent.types";
export function DisplayTextContent({ content }: TDisplayContentProps) {
  return (
    <div className=" bg-white max-w-xl px-4 py-3">
      <p>{content}</p>
    </div>
  );
}
