import { settings } from "./settings/settings.js";
import { createNavbar } from "./scripts/navbar.js";
import { createSudoku } from "./scripts/sudoku.js";
const field = document.querySelector(".field");
const numberBtn = document.querySelector(".numbers-btn");

const board = createSudoku.createSudokuBoard();
const squares = createSudoku.createSquares();
const sudokuBtn = createSudoku.createSudokuBtn();
createNavbar();
field.append(board);

squares.forEach((square) => {
  board.append(square);
});

sudokuBtn.forEach((btn) => {
  numberBtn.append(btn);
});

const cells = document.querySelectorAll(".cells");
const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

cells.forEach((cell) => {
  const num = Math.floor(Math.random() * 9) + 1;
  cell.dataset.value = num;
  const numberSpan = document.createElement("span");
  numberSpan.classList.add("main-number");
  numberSpan.textContent = num;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const value = parseInt(cell.dataset.value);
  grid[row][col] = value;
  cell.append(numberSpan);
});

console.log(grid);
