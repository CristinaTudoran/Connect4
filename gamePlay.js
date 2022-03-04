let playerOneName = ""
let playerTwoName = ""
let gameType =""
let yellowPlayer = true
document.getElementById("human-game").disabled = false;
document.getElementById("computer-game").disabled = false;
document.getElementById("reset-button").disabled = true;
document.getElementById("start-game").disabled = true;

// Clear down the elements drawn on the board.
function clearBoard() {
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            document.getElementById(getCellId(rowIndex, colIndex)).style.backgroundColor = "white";
        }
    }
}
 
// Populate the game based on the game state
function drawBoard(board) {
    clearBoard();
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            if (!board[rowIndex][colIndex]) {
                continue;
            }
            document.getElementById(getCellId(rowIndex, colIndex)).style.backgroundColor = board[rowIndex][colIndex];
        }
    }
}

const isValidRowOrColumn = (array) => Array.isArray(array) && (array.length === rows || array.length === columns)

const isValidColumn = (columnArray) => isValidRowOrColumn(columnArray) && columnArray.every(validValue = (item) => ["yellow", "red", null].includes(item))

function makeMove(rowIndex, colIndex, event){
    const board = getBoard();
    const [winnerPlayer, turn] = takeTurn(rowIndex, colIndex, board, yellowPlayer)
    yellowPlayer = turn
    winner = winnerPlayer
    if(gameType ==="computer" && !yellowPlayer){
        const [cpRowIndex, cpColIndex] = computerGame(board);
        const [winnerComputer, turn] = takeTurn(cpRowIndex, cpColIndex, board, yellowPlayer)
        yellowPlayer = turn
        winner = winnerComputer
    }
    if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) {
        throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'yellow' or 'red'. Actually received: " + JSON.stringify(board);
    }
    drawBoard(board);
    if (winner !== null) {
        if (typeof winner !== "string" || !["yellow", "red", "nobody"].includes(winner)) {
            throw "Expecting 'checkWinner' to return null or one of the strings 'yellow', 'red' or 'nobody'. Actually received: " + winner;
        }
        const winnerName = document.getElementById("winner-name");
        winnerName.innerText = winner === "yellow" ? currentPlayers[0] : winner === "red" ? currentPlayers[1] : winner;
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.style.display = "block";
    }
}  

// Get a random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// The computer game makes a move
function computerGame(board){
    console.log("I am here")
    let searching = true
    while(searching){
        let colIndex = getRandomInt(columns)
        let rowIndex = getRandomInt(rows)
        if(!board[rowIndex][colIndex]){
            searching = false
            console.log(`Computer move is row ${colIndex} and ${rowIndex}`)
            return [rowIndex, colIndex]
        }
    }
}

// Highlight the column belonging to the board position the mouse is moved over 
function highlightColumn(row, col, event){
    const board = getBoard();
    for (let rowIndex = row; rowIndex < rows; rowIndex++) {
        if (board[rowIndex][col]) {
            break;
        }
        if(yellowPlayer){
            document.getElementById(getCellId(rowIndex, col)).style.backgroundColor = "orange";
        }
        else{
            document.getElementById(getCellId(rowIndex, col)).style.backgroundColor = "purple";
        }
    }
}

// Take the highlight off the column belonging to the board position the mouse is moved over 
function noHighlightColumn(row, col, event){
    const board = getBoard();
    for (let rowIndex = row; rowIndex < rows; rowIndex++) {
        if (board[rowIndex][col]) {
            break;
        }
        document.getElementById(getCellId(rowIndex, col)).style.backgroundColor = "white";
    }
}

// The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) {
    resetGame();
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    clearBoard();
    showHTMLObject("grid")
    showHTMLObject("player-turn");
    showHTMLObject("start-game");
    disableButton("human-game");
    disableButton("computer-game");
    disableButton("reset-button");
    currentPlayers = [];
    yellowPlayer = true;
}

// Function used to change the display property of an HTML object
function showHTMLObject(objectID){
    htmlObject = document.getElementById(objectID);
    htmlObjectStyle = window.getComputedStyle(htmlObject);
    htmlObjectDisplay = htmlObjectStyle.getPropertyValue('display');
    if(htmlObjectDisplay === "none"){
        htmlObject.style.display = "inline-block"
    }
    else{
        htmlObject.style.display = "none"
    }
}

// Function used to enable or disable a button
function disableButton(buttonID){
    disabledButton = document.getElementById(buttonID).disabled;
    document.getElementById(buttonID).disabled = !document.getElementById(buttonID).disabled;
}

// Function used to hide an HTML object based on its ID
function hideHTMLObject(objectID){
    htmlObject = document.getElementById(objectID);
    htmlObjectStyle = window.getComputedStyle(htmlObject)
    htmlObjectDisplay = htmlObjectStyle.getPropertyValue('display')
    if(htmlObjectDisplay === "inline-block"){
        htmlObject.style.display = "none";
        disableButton("start-game");
    }
}

// The Human vs human game button was clicked, show the form where each player can enter their names
function showOnePlayerForm(event){

    showHTMLObject("computer-form")
    hideHTMLObject("names-form")
    gameType="computer"
    disableButton("start-game");

    return gameType
}

// The Human vs computer game button was clicked, show the form where the player can enter their name
function showTwoPlayersForm(event){

    showHTMLObject("names-form")
    hideHTMLObject("computer-form")
    gameType="human"
    disableButton("start-game");

    return gameType
}

function continuePlay(event){
    document.getElementById("yellow-name").value = currentPlayers[0];
    document.getElementById("red-name").value = currentPlayers[1];
    clearBoard();
    resetGame();
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    yellowPlayer = true;
    changePlayerTurn(yellowPlayer);
}

// Add the players to the player records if they don't already exist
function startGame(event){

    yellowPlayer = true;
    changePlayerTurn(yellowPlayer);
    if(gameType !== ""){
        if(gameType === "human"){
            player1InputText = document.getElementById("yellow-name");
            player2InputText = document.getElementById("red-name");
            playerOneName = player1InputText.value;
            playerTwoName = player2InputText.value;
            if(checkPlayerNameExists(playerOneName) && checkPlayerNameExists(playerTwoName)){
                showTwoPlayersForm();
                showHTMLObject("grid");
                showHTMLObject("player-turn");
                showHTMLObject("start-game");
            }
            player1InputText.value = "";
            player2InputText.value = "";
        }
        else if(gameType === "computer"){
            player1InputText = document.getElementById("yellow-one-name");
            playerOneName = player1InputText.value;
            playerTwoName = "Computer";
            checkPlayerNameExists(playerTwoName);
            if(checkPlayerNameExists(playerOneName)){
                showOnePlayerForm();
                showHTMLObject("grid");
                showHTMLObject("player-turn");
                showHTMLObject("start-game");
            }
            player1InputText.value = "";
        }
        
        currentPlayers.push(playerOneName, playerTwoName);
        changePlayerTurn(yellowPlayer);
        disableButton("human-game");
        disableButton("computer-game");
        document.getElementById("reset-button").disabled = false;
        
        console.log(players);
    }
}

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetClick);

// Bind the click event for the exit button.
const exitButton = document.getElementById("exit-button");
exitButton.addEventListener("click", resetClick);

// Bind the click event for the human vs human game.
const humanGameButton = document.getElementById("human-game");
humanGameButton.addEventListener("click", showTwoPlayersForm);

// Bind the click event for the score the leader board button.
// const leaderBoardButton = document.getElementById("view-scores");
// leaderBoardButton.addEventListener("click", showLeaderBoard);

// Bind the click event for the human vs computer game.
const computerGameButton = document.getElementById("computer-game");
computerGameButton.addEventListener("click", showOnePlayerForm);

// Bind the click event for the submit player names button.
const startGameButton = document.getElementById("start-game");
startGameButton.addEventListener("click", startGame);

// Bind the click event for the continue playing names button.
const continuePlayButton = document.getElementById("continue-play");
continuePlayButton.addEventListener("click", continuePlay);

//Bind the click events and the the on hoover events for the game board 
for(let rowIndex = 0; rowIndex <rows; rowIndex++){
    for(let colIndex = 0; colIndex < columns; colIndex++){
        const gridPosition = document.getElementById(getCellId(rowIndex, colIndex));
        gridPosition.addEventListener('click', makeMove.bind(null, rowIndex, colIndex));
        gridPosition.addEventListener('mouseover', highlightColumn.bind(null, rowIndex, colIndex));
        gridPosition.addEventListener('mouseout', noHighlightColumn.bind(null, rowIndex, colIndex));
    }
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        clearBoard,
        drawBoard,
        isValidRowOrColumn,
        isValidColumn,
        makeMove,
        resetClick,
        changePlayerTurn,
    }
}