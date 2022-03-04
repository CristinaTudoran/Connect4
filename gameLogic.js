let rows = 6
let columns = 7
let board= []
let rowCheck = Math.floor(rows/2)
let columnCheck = Math.floor(columns/2)
let players = []
let currentPlayers = []

// initialize the values of each cell on the board with null
for(let row = 0; row < rows; row++){
    board[row] = []
    for(let col = 0; col < columns; col++){
        board[row][col] = null
    }
}

function getCellId(rowIndex, columnIndex){
    return `row-${rowIndex}-column-${columnIndex}`
}

// Change the name of the player shown based on whose turn it is 
function changePlayerTurn(yellowPlayer){
    const playerMessage = document.getElementById("player-name");
    if(yellowPlayer){
        playerMessage.innerText = `${currentPlayers[0]}'s turn`
        playerMessage.style.color = "yellow"
    }
    else{
        playerMessage.innerText = `${currentPlayers[1]}'s turn`
        playerMessage.style.color = "red"
    }
}

function takeTurn(row, column, board, yellowPlayer) {
    let winner = checkWinner(board)
    if (winner === null){
        let emptyPosition = true
        while(emptyPosition && row < 5){
            if (board[row+1][column] !== null){
                emptyPosition = false
            }
            else{
                row++
            }
        }
        if (board[row][column] === null){
            if (yellowPlayer === true){
                board[row][column] = "yellow"
                yellowPlayer = false
            }
            else{
                board[row][column] = "red"
                yellowPlayer = true
            }
            changePlayerTurn(yellowPlayer)
        }

        winner = checkWinner(board)
        console.log("takeTurn was called with row: "+row+", column:"+column);
    }
    else{
        console.log("Game already ended!")
    }
    return [winner, yellowPlayer]
}

function checkRowWinner(board){

    let winner = null
    for(let rowIndex=rows-1; rowIndex > 0; rowIndex--){
        if(winner === null){
            for(let colIndex = 0; colIndex <= columnCheck; colIndex++){
                if(board[rowIndex][colIndex] !== null &&
                    board[rowIndex][colIndex] === board[rowIndex][colIndex+1] &&
                    board[rowIndex][colIndex] === board[rowIndex][colIndex+2] &&
                    board[rowIndex][colIndex] === board[rowIndex][colIndex+3]){
                        winner = board[rowIndex][colIndex]
                        break
                }
            }
        }
    }

    console.log("Row check was called");
    return  winner
}

function checkColumnWinner(board){
    let winner = null
    for(let colIndex=0; colIndex < columns; colIndex++){
        if(winner === null){
            for(let rowIndex = rows-1; rowIndex >= rowCheck; rowIndex--){
                if(board[rowIndex][colIndex] !== null &&
                    board[rowIndex][colIndex] === board[rowIndex-1][colIndex] &&
                    board[rowIndex][colIndex] === board[rowIndex-2][colIndex] &&
                    board[rowIndex][colIndex] === board[rowIndex-3][colIndex]){
                        winner = board[rowIndex][colIndex]
                        break
                }
            }
        }
    }

    console.log("Column check was called");
    return  winner
}
 
function checkDiagonalRight(board){

    let winner = null
    for(let rowIndex=rows-1; rowIndex >= rowCheck; rowIndex--){
        if(winner === null){
            for(let colIndex = 0; colIndex <= columnCheck; colIndex++){
                if(board[rowIndex][colIndex] !== null &&
                    board[rowIndex][colIndex] === board[rowIndex-1][colIndex+1] &&
                    board[rowIndex][colIndex] === board[rowIndex-2][colIndex+2] &&
                    board[rowIndex][colIndex] === board[rowIndex-3][colIndex+3]){
                        winner = board[rowIndex][colIndex]
                        break
                }
            }
        }
    }

    console.log("Diagonal right winner check was called");
    return  winner
}

function checkDiagonalLeft(board){

    let winner = null
    for(let rowIndex=rows-1; rowIndex >= rowCheck; rowIndex--){
        if(winner === null){
            for(let colIndex = columns -1; colIndex > 0; colIndex--){
                if(board[rowIndex][colIndex] !== null &&
                    board[rowIndex][colIndex] === board[rowIndex-1][colIndex-1] &&
                    board[rowIndex][colIndex] === board[rowIndex-2][colIndex-2] &&
                    board[rowIndex][colIndex] === board[rowIndex-3][colIndex-3]){
                        winner = board[rowIndex][colIndex]
                        break
                }
            }
        }
    }

    console.log("Diagonal left winner check was called");
    return  winner
}

// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
function checkWinner(board) {

    let winner = null

    let emptySpaces = rows*columns
    for(let rowIndex = 0; rowIndex < rows; rowIndex++){
        for(let colIndex = 0; colIndex < columns; colIndex++){
            if (board[rowIndex][colIndex] === null){
                emptySpaces -= 1
            }
        }
    }
    
    let rowWinner = checkRowWinner(board)
    let columnWinner = checkColumnWinner(board)
    let rightDiagWinner = checkDiagonalRight(board)
    let leftDiagWinner = checkDiagonalLeft(board)

    if(rowWinner !== null){
        winner = rowWinner
    }
    else if(columnWinner !== null){
        winner = columnWinner
    }
    else if(rightDiagWinner !== null){
        winner = rightDiagWinner
    }
    else if(leftDiagWinner !== null){
        winner = leftDiagWinner
    }
    else if (emptySpaces === rows*columns){
        winner = "nobody"
    }

    // increase the winner's score by 1
    
    if(winner === "yellow"){
        for(const player of players){
            if (player.name === currentPlayers[0]){
                player.score += 1
            }
        }
    }
    else if(winner == "red"){
        for(const player of players){
            if (player.name === currentPlayers[1]){
                player.score += 1
            }
        }
    }

    console.log("checkWinner was called");
    console.log(board)
    return winner;
}

// Set the game state back to its original state to play another game.
function resetGame() {
    for(let rowIndex = 0; rowIndex < rows; rowIndex++){
        board[rowIndex] = []
        for(let colIndex = 0; colIndex < columns; colIndex++){
            board[rowIndex][colIndex] = null
        }
    }
    console.log("resetGame was called");
}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {

    console.log("getBoard was called");
    return board;
}

// Check if the name player entered already exists
//if player does not already exists, add it with the score of 0
function checkPlayerNameExists(name){

    let suitableName = false
    if(name === "" || players.find(player => player.name === name)){
        console.log("This name either already exists or is empty. Please enter a suitable player name!")
    }
    else{
        let player = {"name" : name, "score" : 0}
        players.push(player)
        suitableName = true
    }
    return suitableName
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
        getCellId,
        checkPlayerNameExists,
        checkColumnWinner,
        checkDiagonalLeft,
        checkDiagonalRight,
        checkRowWinner,
        rows,
        columns,
        board,
        players,
    }
}