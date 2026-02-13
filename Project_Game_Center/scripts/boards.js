export class createBoards {
  static createSudokuBoard() {
    const div = document.createElement("div");
    div.classList.add("outer-field");

    return div;
  }
  static createSquares() {
    const finalSquare = [];

    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      const square = document.createElement("div");
      square.classList.add("outer-squares");
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        const cell = document.createElement("div");
        cell.classList.add("inner-squares");
        cell.dataset.row = Math.floor(cellIndex / 3);
        cell.dataset.col = Math.floor(cellIndex % 3);
        cell.dataset.block = squareIndex;
        for (let notesIndex = 0; notesIndex < 9; notesIndex++) {
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
}
