import type { TSudokuGenerateBtnProps } from "../types/sudoku.types";

export function GenerateSudokuBtn({ text, onClick }: TSudokuGenerateBtnProps) {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
}
