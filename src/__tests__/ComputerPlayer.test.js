const { test, expect } = require("@jest/globals");
const { ComputerPlayer } = require("../factories/ComputerPlayer");
const { gameBoardFactory } = require("../factories/gameboardFactory");

test("expect computer to create random attack within bounds", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    const attack = (player.getRandomAttack()).split(",")
    const x = parseInt(attack[0])
    const y = parseInt(attack[1])
    expect(x < 10 && x > 0).toBe(true);
    expect(y < 10 && y > 0).toBe(true);
})

test("expect ship to be sunk", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    const ship = enemyGameBoard.ships[2];
    enemyGameBoard.placeShip(0,0,ship, 0);
    enemyGameBoard.receiveAttack(0,0);
    enemyGameBoard.receiveAttack(0,1);
    enemyGameBoard.receiveAttack(0,2);
    expect(player.checkIfShipIsSunk('0,2')).toBe(true);
})

test("expect if given 100 shots, ship will be sunk and rest will be misses", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    const ship = enemyGameBoard.ships[0];
    enemyGameBoard.placeShip(0,0,ship, 0);
    for (let i=0; i<100;i++) {
        player.attack();
    }
    expect(enemyGameBoard.board).toBe(true);
    expect((enemyGameBoard.board.filter(arr => arr.indexOf("+") !== -1)).length).toBe(5);
    expect((enemyGameBoard.board.filter(arr => arr.indexOf("~") !== -1)).length).toBe(95);
})

