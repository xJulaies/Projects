import { SudokuNotes } from "../atoms/sudokuNotes.atm";
import styles from "../styles/sudoku.module.css";
import type { TSudokuCellProps } from "../types/sudoku.types";

export function SudokuCell({
  cell,
  isSelected,
  rowIndex,
  colIndex,
}: TSudokuCellProps) {
  return (
    <button
      type="button"
      className={isSelected ? `${styles.cell} ${styles.selectedCell}` : styles.cell}
      data-row={rowIndex}
      data-col={colIndex}
    >
      {cell.value ? cell.value : <SudokuNotes notes={cell.notes} />}
    </button>
  );
}
