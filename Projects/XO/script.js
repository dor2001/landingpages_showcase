let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const boardCells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function handleClick(index) {
    if (board[index] === "") {
        board[index] = currentPlayer;
        render();
        if (checkWinner()) {
            message.innerText = ` !ניצח ${currentPlayer} השחקן `;
            disableCells();
        } else if (board.every(cell => cell !== "")) {
            message.innerText = "!תיקו";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.innerText = `${currentPlayer} תור השחקן `;
        }
    }
}

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function render() {
    board.forEach((cell, index) => {
        const cellElement = boardCells[index];
        cellElement.innerHTML = "";
        if (cell === "X") {
            const img = document.createElement("img");
            img.src = "player_x.png"; // Replace "player_x.jpg" with the path to the image for Player X
            cellElement.appendChild(img);
        } else if (cell === "O") {
            const img = document.createElement("img");
            img.src = "player_o.png"; // Replace "player_o.jpg" with the path to the image for Player O
            cellElement.appendChild(img);
        }
    });
}

function resetGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    message.innerText = `${currentPlayer} תור השחקן `;
    boardCells.forEach(cell => cell.innerText = "");
    enableCells();
}

function disableCells() {
    boardCells.forEach(cell => cell.onclick = null);
}

function enableCells() {
    boardCells.forEach((cell, index) => {
        if (board[index] === "") {
            cell.onclick = () => handleClick(index);
        }
    });
}

message.innerText = `${currentPlayer} תור השחקן `;
enableCells();
