const fs = require('fs')
window.document.body.innerHTML = fs.readFileSync('./connect4_main.html')
const {resetGame, getBoard, checkRowWinner, checkColumnWinner, checkDiagonalRight, checkDiagonalLeft, takeTurn} = require('./gameLogic.js')

// test the reset game function
// it should set the board to original state with the original dimensions    
describe('When calling the reset game function', () => {
    it('should set the board to original state and dimensions', () => {
        //arrange
        const board = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, "yellow", null, null],
            [null, null, "yellow", null, "red", null, null],
        ]

        const newBoard =[
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
        ]
        //act
        resetGame();
        const result = getBoard();
        //assert
        expect(result).toStrictEqual(newBoard);
    })
})

// test if checking winner on a row works 
// it should return the color of the counter when there is a winner on the board
describe('When calling the check winner row function', () => {
    it('should return the color of the player who won ie yellow', () => {
        //arrange
        const board = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, "red", null, null, "red", null, null],
            ["yellow", "yellow", "yellow", "yellow", "red", null, null],
        ]

        const winner = "yellow";
        //act
        const result = checkRowWinner(board);
        //assert
        expect(result).toBe(winner);
    })
        
})

// test if checking winner on a column works 
// it should return the color of the counter when there is a winner on the board
describe('When calling the check winner column function', () => {
    it('should return the color of the player who won ie yellow', () => {
        //arrange
        const board = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            ["yellow", null, null, null, null, null, null],
            ["yellow", null, null, null, null, null, null],
            ["yellow", null, null, null, null, null, null],
            ["yellow", "red", null, "red", "red", null, null],
        ]

        const winner = "yellow";
        //act
        const result = checkColumnWinner(board);
        //assert
        expect(result).toBe(winner);
    })
        
})

// test if checking winner on a the right diagonal works 
// it should return the color of the counter when there is a winner on the board
describe('When calling the check winner diagonal right function', () => {
    it('should return the color of the player who won ie yellow', () => {
        //arrange
        const board = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, "yellow", null, null, null],
            [null, null, "yellow", "yellow", null, null, null],
            [null, "yellow", "yellow", "red", null, null, null],
            ["yellow", "red", "red", "red", null, null, "red"],
        ]

        const winner = "yellow";
        //act
        const result = checkDiagonalRight(board);
        //assert
        expect(result).toBe(winner);
    })
        
})

// test if checking winner on a the left diagonal works 
// it should return the color of the counter when there is a winner on the board
describe('When calling the check winner left diagonal function', () => {
    it('should return the color of the player who won ie yellow', () => {
        //arrange
        const board = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, "yellow", null, null, null, null],
            [null, null, "red", "yellow", null, null, null],
            [null, null, "red", "red", "yellow", null, null],
            ["yellow", null, "yellow", "red", "red", "yellow", null],
        ]

        const winner = "yellow";
        //act
        const result = checkDiagonalLeft(board);
        //assert
        expect(result).toBe(winner);
    })
        
})

// test the take turn function
// if a position is empty, the counter is placed there
describe('When calling the take turn function with row 2 and column 1', () => {
    it('the counter should be placed on the latest row with available space on the chosen column', () => {
        // arrange
        const board = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, "yellow", null, null],
            [null, null, "yellow", null, "red", null, null],
        ]

        const updatedBoard = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, "yellow", null, null],
            [null, "red", "yellow", null, "red", null, null],
        ]

        const yellowPlayer = false;
        const row = 2;
        const column = 1;
        const currentPlayers = ["Anna", "Maria"];

        //act
        const winner = takeTurn(row, column, board, yellowPlayer);

        //assert
        expect(board).toStrictEqual(updatedBoard);
    })
})