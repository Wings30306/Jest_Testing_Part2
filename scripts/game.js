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
    // Array.from(document.getElementsByClassName("circle")).forEach(
    //     circle => {
    //         if (circle.getAttribute("data-listener" !== "true")) {
    //             circle.addEventListener("click", (e) => {
    //                 let move = e.target.getAttribute("id");
    //                 lightsOn(move);
    //                 game.playerMoves.push(move);
    //                 playerTurn();
    //             })
    //             circle.setAttribute("data-listener", "true")
    //         }          
    //     }
    // )
}

function showScore(){
    document.getElementById("score").innerText = game.score;
}

function addTurn(){
    game.currentGame = [...game.currentGame, game.choices[Math.floor(Math.random()*game.choices.length)]]
}

// function playerTurn(){
//     let i = game.playerMoves.length - 1;
//     if (game.playerMoves[i] == game.currentGame[i]){
//         if (game.currentGame.length == game.playerMoves.length){
//             game.score++;
//             showScore();
//             addTurn();
//         }
//     }
// }

module.exports = { game, newGame };