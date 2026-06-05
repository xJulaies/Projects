import type { TShowMoreBtnProps } from "../../types/search.types";

export function ShowMoreBtn({ hasMore, onShowMore, text }: TShowMoreBtnProps) {
  if (!hasMore) return null;

  return (
    <>
      <div className="flex justify-center p-8">
        <button onClick={onShowMore} className="btn btn-primary btn-xl">
          {text}
        </button>
      </div>
    </>
  );
}
