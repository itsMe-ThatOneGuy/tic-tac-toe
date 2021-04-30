const gameBoard = (() => {
    const board = Array(9).fill("");

    const setCell = (index, sign) => {
        board[index] = sign;
    };

    const getCellIndex = (index) => {
        return board[index];
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };
    
    return {setCell, getCellIndex, resetBoard}
})();

const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return {getSign};
};

const displayController = (() => {
    const cellElements = document.querySelectorAll('.cell');
    const restartButton = document.querySelector('.restart-button');
    const messageContainer = document.querySelector('.message-container');

    cellElements.forEach((cell) =>
        cell.addEventListener('click', (e) => {
            if (e.target.textContent !== "" || gameLoop.checkGameOver()) return;
            gameLoop.gameRound(parseInt(e.target.dataset.index));
            renderGameBoard();
        })
    );

    restartButton.addEventListener('click', () => {
        gameBoard.resetBoard();
        gameLoop.reset();
        renderGameBoard();
        turnMessage(gameLoop.currentPlayer());
    });

    const renderGameBoard = () => {
        for (let i = 0; i < cellElements.length; i++) {
            cellElements[i].textContent = gameBoard.getCellIndex(i);
        }
    };

    const turnMessage = (player) => {
        messageContainer.textContent = `${player}'s turn`;
    };

    const winMessage = (winner) => {
        if (winner === "draw") {
            messageContainer.textContent = "Draw"
        } else {
            messageContainer.textContent = `${winner} Wins!`    
        }  
    };

    return {turnMessage, winMessage};
})();

const gameLoop = (() => {
    const player1 = player('X');
    const player2 = player('0');
    let round = 1;
    let gameOver = false;

    const gameRound = (index) => {
        gameBoard.setCell(index, currentPlayer());
        if (winCheck(index)) {
            gameOver = true;
            displayController.winMessage(currentPlayer());
            return;
        }
        if (round === 9) {
            gameOver = true;
            displayController.winMessage("draw");
            return
        }
        round++;
        displayController.turnMessage(currentPlayer());
    };

    const currentPlayer = () => {
        return round % 2 === 1 ? player1.getSign() : player2.getSign();
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    const winCheck = (index) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        return winConditions
            .filter((combo) => combo.includes(index))
            .some((combos) => 
            combos.every(
                (index) => gameBoard.getCellIndex(index) === currentPlayer()
            )
        );            
    };

    const checkGameOver = () => {
        return gameOver;
    }

    return {gameRound, reset, checkGameOver, currentPlayer};
})();