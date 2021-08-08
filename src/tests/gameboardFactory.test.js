const { test, expect } = require("@jest/globals");
const { gameBoardFactory } = require("../Gameboard");

test('gameboard is 2D board array of coords', () => {
    const gameBoard = gameBoardFactory();
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
})

test('places ship on gameboard horizontally and update ship coords', () => {
    const gameBoard = gameBoardFactory();
    const ship = gameBoard.ships[2];
    gameBoard.placeShip(0,0, ship, true);
    expect(gameBoard.ships[2].coords).toStrictEqual(["0,0", "0,1", "0,2"]);
    expect(gameBoard.board[0]).toStrictEqual(['#','#','#',0,0,0,0,0,0,0]);
})

test('places ship on gameboard vertically and update ship coords', () => {
    const gameBoard = gameBoardFactory();
    const ship = gameBoard.ships[0];
    gameBoard.placeShip(0,0, ship, false);
    expect(gameBoard.ships[0].coords).toStrictEqual(["0,0", "1,0", "2,0", "3,0", "4,0"]);
    expect((gameBoard.board.filter(arr => arr.indexOf("#") !== -1)).length).toBe(5);
})

test('expect ship to have received attack', () => {
    const gameBoard = gameBoardFactory();
    const ship = gameBoard.ships[0];
    gameBoard.placeShip(0,0, ship, true);
    expect(ship.coords.indexOf('0,0')).not.toBe(-1);
    expect(gameBoard.receiveAttack(0,0)).toBe(true);
})

test('expect all ships not to be sunk', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.receiveAttack(0,0);
    expect(gameBoard.allShipsSunk()).toBe(false);
})

test('expect all ships to be sunk', () => {
    const gameBoard = gameBoardFactory();
    const ship = gameBoard.ships[0];
    gameBoard.placeShip(0,0, ship, true);
    const ship1 = gameBoard.ships[1];
    gameBoard.placeShip(1,0, ship1, true);
    const ship2 = gameBoard.ships[2];
    gameBoard.placeShip(2,0, ship2, true);
    const ship3 = gameBoard.ships[3];
    gameBoard.placeShip(3,0, ship3, true);
    const ship4 = gameBoard.ships[4];
    gameBoard.placeShip(4,0, ship4, true);

    gameBoard.receiveAttack(0,0);
    gameBoard.receiveAttack(0,1);
    gameBoard.receiveAttack(0,2);
    gameBoard.receiveAttack(0,3);
    gameBoard.receiveAttack(0,4);
    gameBoard.receiveAttack(1,0);
    gameBoard.receiveAttack(1,1);
    gameBoard.receiveAttack(1,2);
    gameBoard.receiveAttack(1,3);
    gameBoard.receiveAttack(2,0);
    gameBoard.receiveAttack(2,1);
    gameBoard.receiveAttack(2,2);
    gameBoard.receiveAttack(3,0);
    gameBoard.receiveAttack(3,1);
    gameBoard.receiveAttack(3,2);
    gameBoard.receiveAttack(4,0);
    gameBoard.receiveAttack(4,1);

    expect(gameBoard.allShipsSunk()).toBe(true);
})

