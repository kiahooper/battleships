const { test, expect } = require("@jest/globals");
const { ComputerPlayer } = require("../factories/ComputerPlayer");
const { gameBoardFactory } = require("../factories/gameboardFactory");

test("expect 4 surrounding targets around 'attack'", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    player.addTargets('1,1');
    expect(player.targets).toStrictEqual([[1,0],[1,2],[0,1],[2,1]]);
})

test("expect corner attack to have 2 surrounding targets", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    let targets = [[0,0],[-1,0],[1,0],[0,-1]]
    targets = player.filterTargets(targets);
    expect(targets.length).toStrictEqual(2);
})

test("expect attack with previous hit in targets to have 3 surrounding targets", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    let targets = [[1,0],[2,1],[1,2],[2,0]];
    player.previousAttacks.push("1,0");
    targets = player.filterTargets(targets);
    expect(targets.length).toStrictEqual(3);
    expect(targets).not.toContain("1,0");
})

test("expect orientation specific targets after 2 successfull hits", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    let targets = [[1,0],[2,1],[1,2],[2,0],[1,3],[2,2],[3,2]];
    player.previousAttacks.push("1,1");
    player.previousAttacks.push("1,2");
    let hits = ['1,1','1,2'];
    targets = player.filterTargets(targets);
    let lineTargets = player.filterTargetsForShipLines(targets, hits);
    expect(lineTargets).toStrictEqual([[1,0],[1,3]]);
})

test("expect previous attacks to be mapped on densityMap", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    player.previousAttacks.push("3,5");
    player.previousAttacks.push("9,9");
    let densityMap = Array(10).fill().map(() => Array(10).fill(0));
    densityMap = player.mapPreviousAttacks(densityMap);
    expect(densityMap[3]).toContain("X");
    expect(densityMap[9][9]).toStrictEqual("X");
})

test("expect canPlaceShip to be true if the ship fits, false if it doesn't", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard);
    const ship = enemyGameBoard.ships[0].ship;
    expect(player.canPlaceShip(0,0,ship,0, enemyGameBoard.board)).toStrictEqual(true);
    expect(player.canPlaceShip(0,6,ship,0, enemyGameBoard.board)).toStrictEqual(false);
})

test("expect calculation of densities on bare board to be consistent", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    let densityMap = Array(10).fill().map(() => Array(10).fill(0));
    densityMap = player.calculateDensities(densityMap);
    expect(densityMap).toStrictEqual([[10, 15, 19, 21, 22, 22, 21, 19, 15, 10], [15, 20, 24, 26, 27, 27, 26, 24, 20, 15], [19, 24, 28, 30, 31, 31, 30, 28, 24, 19], [21, 26, 30, 32, 33, 33, 32, 30, 26, 21], [22, 27, 31, 33, 34, 34, 33, 31, 27, 22], [22, 27, 31, 33, 34, 34, 33, 31, 27, 22], [21, 26, 30, 32, 33, 33, 32, 30, 26, 21], [19, 24, 28, 30, 31, 31, 30, 28, 24, 19], [15, 20, 24, 26, 27, 27, 26, 24, 20, 15], [10, 15, 19, 21, 22, 22, 21, 19, 15, 10]])
})

test("expect calculation of densities change depending on previous attacks", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    let densityMap = Array(10).fill().map(() => Array(10).fill(0));
    densityMap = player.calculateDensities(densityMap);
    player.previousAttacks.push("5,5");
    let newDensityMap = JSON.parse(JSON.stringify(densityMap));
    newDensityMap = player.mapPreviousAttacks(newDensityMap);
    newDensityMap = player.calculateDensities(newDensityMap);
    expect(newDensityMap).not.toStrictEqual(densityMap);

})

test("expect calculation of densities change depending on sunk ships", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    let densityMap = Array(10).fill().map(() => Array(10).fill(0));
    densityMap = player.calculateDensities(densityMap);
    player.shipsSunk.push("Destroyer");
    let newDensityMap = JSON.parse(JSON.stringify(densityMap));
    newDensityMap = player.calculateDensities(newDensityMap);
    expect(newDensityMap).not.toStrictEqual(densityMap);
})

test("expect hunt attack to be at highest probability", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    let densityMap = Array(10).fill().map(() => Array(10).fill(0));
    densityMap = player.calculateDensities(densityMap);
    let coord = (player.getHuntAttack()).split(",");
    expect(densityMap[coord[0]][coord[1]]).toStrictEqual(34);
})

test("expect no errors in a game", () => {
    const enemyGameBoard = gameBoardFactory();
    const player = ComputerPlayer(enemyGameBoard); 
    for(let i=0; i<100; i++) {
        expect(player.attack()).toBe(false);
    }
    
})