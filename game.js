// Global Variables
let gameMode = ''
let currentPlayer = 'X'
const gameBoard = Array(3).fill(null).map(() => Array(3).fill(null));


/* Specify if the game is going to be two-player or against AI based on the user-selected button */
document.getElementById('twoPlayerGame').addEventListener('click', function() {
    startGame('twoPlayer');
});
document.getElementById('playAgainstAI').addEventListener('click', function() {
    startGame('AI');
});

/* Start the game */
function startGame(mode) {
    gameMode = mode;
    currentPlayer = 'X';
    document.getElementById('mainScreen').classList.add('hide');
    document.getElementById('gameScreen').classList.remove('hide');
    resetBoard();
    attachListeners();   
}

/* Reset the board when necessary */
function resetBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX', 'playerO');
    });
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            gameBoard[row][col] = null;
        }
    }
}

/* Set up listeners for click events */
function attachListeners() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}
