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
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const row = cell.getAttribute('data-row');
    const col = cell.getAttribute('data-col');

    // Make move
    if (gameBoard[row][col] === null) {
        gameBoard[row][col] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add('player' + currentPlayer);

        // Check for win or draw
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            setTimeout(() => {
                reset();
            }, 1000); 
        } else if (checkDraw()) {
            alert("It's a draw!");
            setTimeout(() => {
                reset();
            }, 1000); 
        }

        // Switch player or AI move
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (gameMode === 'AI' && currentPlayer === 'O') {
            aiMove();
        }
    }
}

/* Check to see if the game is over */
function checkWin() {
    const lines = [
        [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], // Rows
        [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]], // Columns
        [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]  // Diagonals
    ];
    return lines.some(line => {
        const [[r1, c1], [r2, c2], [r3, c3]] = line;
        return gameBoard[r1][c1] && gameBoard[r1][c1] === gameBoard[r2][c2] && gameBoard[r1][c1] === gameBoard[r3][c3];
    });
}

/* Check to see if the game ends in a draw */
function checkDraw() {
    return gameBoard.flat().every(cell => cell !== null);
}

/* Use the current board data to have the 'AI' make a move */
function aiMove() {
    // Implement later.
}

/* Send the user back to the main screen after the game is over. */
function reset() {
    document.getElementById('gameScreen').classList.add('hide');
    document.getElementById('mainScreen').classList.remove('hide');
}