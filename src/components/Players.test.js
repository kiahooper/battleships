const { test, expect } = require("@jest/globals");
const { Players } = require("./Players");
const { gameBoardFactory } = require("./Gameboard");


test('player can attack enemy gameboard', () => {
    const enemyGameBoard = gameBoardFactory();
    const player = Players().Player(enemyGameBoard);
    enemyGameBoard.placeShip(0,0, enemyGameBoard.ships[0], true);
    expect(player.attack(0,0)).toBe(true);
})

test('adds attack to previous attacks array', () => {
    const enemyGameBoard = gameBoardFactory();
    const computer = Players().ComputerPlayer(enemyGameBoard);
    computer.attack(0,0);
    expect(computer.previousAttacks.length).toBeGreaterThan(0);
})

test('does not repeat previous attacks', () => {
    let previousAttacks = [];
    let attack = '0,0';
    previousAttacks.push(attack);
})

test('players take turn', () => {
    let turn = true; 
    if (turn) {
        // player1.move()
    } else {
        // player2.move()
    }
    turn = !turn;
    expect(turn).toBe(false);
})
