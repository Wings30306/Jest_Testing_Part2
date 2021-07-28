let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
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
    showScore();
    addTurn();
}

function showScore(){
    document.getElementById("score").innerText = game.score;
}

function addTurn(){
    game.currentGame = [...game.currentGame, game.choices[Math.floor(Math.random()*game.choices.length)]]
}


module.exports = { game, newGame };