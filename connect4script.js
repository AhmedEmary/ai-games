const board = document.getElementById('board');
const modal = document.getElementById('myModal');
const modalContent = document.getElementById('modalContent');
const modalMessage = document.getElementById('modalMessage');
const closeButton = document.getElementsByClassName('close')[0];
const restartButton = document.getElementById('restartButton');
const restartButtonModal = document.getElementById('restartButtonModal');

let currentPlayer = 'red';
let gameActive = true;
let gameState = Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => null));

restartButton.addEventListener('click', startGame);
restartButtonModal.addEventListener('click', () => {
  hideModal();
  startGame();
});

function startGame() {
  gameActive = true;
  currentPlayer = 'red';
  gameState = Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => null));
  render();
}

function dropDisc(column) {
  const row = gameState[column].findIndex(cell => cell === null);
  if (row !== -1) {
    gameState[column][row] = currentPlayer;
    checkWin(column, row);
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    render();
  }
}

function checkWin(column, row) {
  const directions = [
    [1, 0], // Horizontal
    [0, 1], // Vertical
    [1, 1], // Diagonal /
    [-1, 1] // Diagonal \
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
      const x = column + i * dx;
      const y = row + i * dy;
      if (x < 0 || x >= 7 || y < 0 || y >= 6 || gameState[x][y] !== currentPlayer) break;
      count++;
    }
    for (let i = 1; i < 4; i++) {
      const x = column - i * dx;
      const y = row - i * dy;
      if (x < 0 || x >= 7 || y < 0 || y >= 6 || gameState[x][y] !== currentPlayer) break;
      count++;
    }
    if (count >= 4) {
      showModal(`${currentPlayer === 'red' ? 'Red' : 'Yellow'} wins!`);
      gameActive = false;
      return;
    }
  }

  if (gameState.every(column => column.every(cell => cell !== null))) {
    showModal('Draw!');
    gameActive = false;
  }
}

function render() {
  board.innerHTML = '';
  for (let y = 5; y >= 0; y--) {
    for (let x = 0; x < 7; x++) {
      const cell = document.createElement('div');
      cell.classList.add('column');
      cell.style.backgroundColor = gameState[x][y] === null ? 'white' : gameState[x][y];
      cell.addEventListener('click', () => {
        if (gameActive) dropDisc(x);
      });
      board.appendChild(cell);
    }
  }
}

function showModal(message) {
  modalMessage.innerText = message;
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

startGame();
