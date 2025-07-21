const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const vsComputer = document.getElementById("vsComputer");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Cols
  [0, 4, 8], [2, 4, 6]              // Diags
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index] !== "") return;

  makeMove(index, currentPlayer);
  if (checkWin(currentPlayer)) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "😐 It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer.checked && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function computerMove() {
  if (!gameActive) return;
  const emptyIndexes = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  makeMove(randomIndex, "O");

  if (checkWin("O")) {
    statusText.textContent = `🤖 Computer wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "😐 It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

function checkWin(player) {
  return winCombos.some(combo => {
    return combo.every(index => board[index] === player);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
