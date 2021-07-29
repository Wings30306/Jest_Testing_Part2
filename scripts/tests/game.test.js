/**
 * @jest-environment jsdom
 */

const { game, newGame, addTurn, lightsOn, showTurns, playerTurn } = require("../game")

jest.spyOn(window, "alert").mockImplementation(() => { })

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices array contains correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ["button2", "button4"];
        game.playerMoves = ["button2", "button4"];
        document.getElementById("score").innerText = "42"
        newGame();
    });
    test("should reset score", () => {
        expect(game.score).toEqual(0);
    });
//    ----- NOT APPLICABLE ANYMORE AFTER ADD TURN IS ADDED
//    test("should reset currentGame", () => { 
//        expect(game.currentGame).toEqual([])
//    });
//    ----------------------------------------------- 
    test("Computer's game array currentMoves should contain one move", () => {
        expect(game.currentGame.length).toBe(1);
    })
    test("should resets playerMoves", () => {
        expect(game.playerMoves).toEqual([]);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("should set data-listener attribute to true after addTurn", () => {
        let circles = Array.from(document.getElementsByClassName("circle"));
        circles.forEach(circle => {
            expect(circle.getAttribute("data-listener")).toEqual("true")
        });
    });
})

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        game.turnNumber = 0;
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment score if turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!")
    })
});