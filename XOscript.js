const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const modal = document.getElementById('myModal');
const modalContent = document.getElementById('modalContent');
const modalMessage = document.getElementById('modalMessage');
const closeButton = document.getElementsByClassName('close')[0];
const board = document.getElementById('board');
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let currentPlayer = 'X';
let gameActive = true;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'winner');
    cell.innerText = ''; // Clear cell text
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  modal.style.display = 'none'; // Hide modal
  board.classList.remove('winner');
  currentPlayer = 'X';
  gameActive = true;
}

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  const currentClass = currentPlayer === 'X' ? 'x' : 'o';

  // Check if the cell is already filled
  if (cell.classList.contains('x') || cell.classList.contains('o')) return;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass;
}

function swapTurns() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw) {
  if (draw) {
    showModal('Draw!');
  } else {
    showModal(`${currentPlayer} wins!`);
  }
  gameActive = false;
  board.classList.add('winner');
}

function showModal(msg) {
  modalMessage.innerText = msg;
  modal.style.display = 'block';
  modalContent.classList.add('animate');
}

function hideModal() {
  modal.style.display = 'none';
}

closeButton.onclick = hideModal;

window.onclick = function(event) {
  if (event.target === modal) {
    hideModal();
  }
};
const restartButtonModal = document.getElementById('restartButtonModal');

restartButtonModal.onclick = function() {
  hideModal();
  startGame();
};