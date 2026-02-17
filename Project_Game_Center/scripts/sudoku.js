export class createSudoku {
  static createSudokuBoard() {
    const div = document.createElement("div");
    div.classList.add("board");

    return div;
  }
  static createSquares() {
    const finalSquare = [];

    for (let block = 0; block < 9; block++) {
      const square = document.createElement("div");
      square.classList.add("squares");
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        const cell = document.createElement("div");
        cell.classList.add("cells");
        const blockRow = Math.floor(block / 3);
        const blockCol = block % 3;
        const innerRow = Math.floor(cellIndex / 3);
        const innerCol = cellIndex % 3;

        const row = blockRow * 3 + innerRow;
        const col = blockCol * 3 + innerCol;

        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.dataset.block = block;

        for (let notesIndex = 1; notesIndex < 10; notesIndex++) {
          const noteSquare = document.createElement("div");
          noteSquare.classList.add("note-square");
          noteSquare.dataset.notesId = notesIndex;
          cell.append(noteSquare);
        }
        square.append(cell);
      }
      finalSquare.push(square);
    }
    return finalSquare;
  }
  static createSudokuBtn() {
    let btnList = [];
    for (let btnIndex = 1; btnIndex < 10; btnIndex++) {
      const btn = document.createElement("button");
      btn.classList.add(`btn-${btnIndex}`);
      btn.textContent = btnIndex;
      btnList.push(btn);
    }
    return btnList;
  }
  static checkRow(grid, row, num) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  static checkCol(grid, col, num) {
    for (let row = 0; row < 9; row++) {
      if (grid[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  static checkBlock(grid, row, col, num) {
    let rowStart = Math.floor(row / 3) * 3;
    let colStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let checkRow = rowStart + i;
        let checkCol = colStart + j;
        if (grid[checkRow][checkCol] === num) {
          return true;
        }
      }
    }
    return false;
  }
}
