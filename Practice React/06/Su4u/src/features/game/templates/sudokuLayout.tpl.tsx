import { PublicLayout } from "../../../shared/templates/publicLayout/public.layout.tpl";
import { SudokuBoard } from "../organisms/sudokuBoard.org";
import styles from "../styles/sudoku.module.css";
import { SudokuNotesToggle } from "../atoms/sudokuNotesToggle.atm";
import { SudokuNumberPad } from "../molecules/sudokuNumberPad.mol";
import { GenerateSudokuBtn } from "../atoms/sudokuGenerateBtn.atm";
import { generateSudokuBoard } from "../lib/sudokuGenerator";
import type { TSudokuValue } from "../types/sudoku.types";
import { useState } from "react";

export function SudokuLayout() {
  const [board, setBoard] = useState(() => generateSudokuBoard());
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [notesMode, setNotesMode] = useState(false);

  function handleGenerateBoard() {
    setBoard(generateSudokuBoard());
    setSelectedCell(null);
    setNotesMode(false);
  }

  function handleCellClick(row: number, col: number) {
    const clickedCell = board[row][col];

    if (clickedCell.isGiven) {
      setSelectedCell(null);
      return;
    }

    if (selectedCell?.row === row && selectedCell?.col === col) {
      setSelectedCell(null);
      return;
    }

    setSelectedCell({ row, col });
  }

  function handleNotesToggle() {
    setNotesMode((currentMode) => !currentMode);
  }

  function handleNumber(value: TSudokuValue) {
    if (!selectedCell) return;

    const selectedBoardCell = board[selectedCell.row][selectedCell.col];
    const isCorrectValue = value === selectedBoardCell.solutionValue;

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

          if (cell.isError && cell.value === value) {
            return {
              ...cell,
              value: null,
              isError: false,
            };
          }

          return {
            ...cell,
            value,
            notes: [],
            isGiven: isCorrectValue,
            isError: !isCorrectValue,
          };
        }),
      ),
    );

    if (isCorrectValue) {
      setSelectedCell(null);
    }
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
              text="Generate board"
            />
          </aside>
        </section>
      </main>
    </PublicLayout>
  );
}
