import { PublicLayout } from "../../../shared/templates/publicLayout/public.layout.tpl";
import { SudokuBoard } from "../organisms/sudokuBoard.org";
import styles from "../styles/sudoku.module.css";
import { SudokuNotesToggle } from "../atoms/sudokuNotesToggle.atm";
import { SudokuNumberPad } from "../molecules/sudokuNumberPad.mol";
import { GenerateSudokuBtn } from "../atoms/sudokuGenerateBtn.atm";
import { emptyBoard } from "../test/testBoards";
import type { TSudokuValue } from "../types/sudoku.types";
import { useState } from "react";

export function SudokuLayout() {
  const [board, setBoard] = useState(emptyBoard);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [notesMode, setNotesMode] = useState(false);

  function handleGenerateBoard() {
    setBoard(emptyBoard);
    setSelectedCell(null);
  }

  function handleCellClick(row: number, col: number) {
    setSelectedCell({ row, col });
  }

  function handleNotesToggle() {
    setNotesMode((currentMode) => !currentMode);
  }

  function handleNumber(value: TSudokuValue) {
    if (!selectedCell) return;

    setBoard((currentBoard) =>
      currentBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelectedCell =
            selectedCell.row === rowIndex && selectedCell.col === colIndex;

          if (!isSelectedCell || cell.isGiven) return cell;

          if (notesMode) {
            const hasNote = cell.notes.includes(value);

            return {
              ...cell,
              notes: hasNote
                ? cell.notes.filter((note) => note !== value)
                : [...cell.notes, value],
            };
          }

          return {
            ...cell,
            value,
            notes: [],
          };
        }),
      ),
    );
  }

  return (
    <PublicLayout>
      <main className={styles.layout}>
        <section className={styles.gameShell}>
          <section className={styles.playArea}>
            <SudokuBoard
              board={board}
              selectedCell={selectedCell}
              onCellClick={handleCellClick}
            />

            <section className={styles.controls}>
              <SudokuNumberPad onNumberClick={handleNumber} />
              <SudokuNotesToggle
                isActive={notesMode}
                onClick={handleNotesToggle}
              />
            </section>
          </section>

          <aside className={styles.sidePanel}>
            <GenerateSudokuBtn
              onClick={handleGenerateBoard}
              text="Reset board"
            />
          </aside>
        </section>
      </main>
    </PublicLayout>
  );
}
