import { settings } from "./settings/settings.js";
import { createNavbar } from "./scripts/navbar.js";
import { createBoards } from "./scripts/boards.js";
const main = document.querySelector(".main");
createNavbar();
const board = createBoards.createSudokuBoard();
const squares = createBoards.createSquares();

main.append(board);

squares.forEach((square) => {
  board.append(square);
});
