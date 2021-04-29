"use strict";

const gameBoard = (() => {
    const board = Array(9).fill("");

    const setCell = (index, sign) => {
        board[index] = sign;
    };

    const getCellIndex = (index) => {
        return board[index];
    };
    
    return {setCell, board, getCellIndex}
})();

const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return {getSign};
};

const displayController = (() => {
    const cellElements = document.querySelectorAll('.cell')

    const updateGameBoard = () => {
        for (let i = 0; i < cellElements.length; i++) {
            cellElements[i].textContent = gameBoard.getCellIndex(i);
        }
    };

    return {updateGameBoard};
})();

const gameLoop = (() => {
    const player1 = player('X');
    const player2 = player('0');

})();

function test() {
    gameBoard.setCell(prompt("Index: "), prompt("Sign: "));
    displayController.updateGameBoard();
}
