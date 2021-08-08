const { test, expect } = require("@jest/globals");
const { Player } = require("../factories/Player");
const { gameBoardFactory } = require("../gameboardFactory");


test('player can attack enemy gameboard', () => {
    const enemyGameBoard = gameBoardFactory();
    const player = Players().Player(enemyGameBoard);
    enemyGameBoard.placeShip(0,0, enemyGameBoard.ships[0], true);
    expect(player.attack(0,0)).toBe(true);
})

