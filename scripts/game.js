let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0
}

/**
 * newGame function needs to:
 * reset values of game object
 * show score
 * add turn
 */
function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName("circle")){
        if (circle.getAttribute("data-listener") !== "true"){
            circle.addEventListener("click", (e) => {
                let move = e.target.getAttribute("id");
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
            })
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
    showTurns();
}

function showScore(){
    document.getElementById("score").innerText = game.score;
}

function addTurn(){
    game.currentGame = [...game.currentGame, game.choices[Math.floor(Math.random()*game.choices.length)]]
}

function lightsOn(circleId) {
    let circle = document.getElementById(circleId);
    circle.classList.add("light");
    setTimeout(() => {
        circle.classList.remove("light");
    }, 1000)
}

function showTurns(){
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length){
            clearInterval(turns)
        } 
    }, 1100)
}

function playerTurn(){
    let i = game.playerMoves.length - 1;
    if (game.playerMoves[i] == game.currentGame[i]){
        if (game.currentGame.length == game.playerMoves.length){
            game.score++;
            showScore();
            addTurn();
        } 
    } else {
        alert("Wrong move!");
        newGame();
    }
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };