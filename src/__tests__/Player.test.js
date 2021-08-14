const { test, expect } = require("@jest/globals");
const { Player } = require("../factories/Player");
const { gameBoardFactory } = require("../factories/gameboardFactory");


test('player can attack enemy gameboard', () => {
    const enemyGameBoard = gameBoardFactory();
    const player = Player(enemyGameBoard);
    enemyGameBoard.placeShip(0,0, enemyGameBoard.ships[0], 1);
    expect(player.attack(0,0)).toBe(true);
})

