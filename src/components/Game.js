const { gameBoardFactory } = require("./Gameboard")
const { Players } = require("./Players")

const Game = () => {

    const players = Players()
    const gameboard1 = gameBoardFactory();
    const gameboard2 = gameBoardFactory();
    const player1 = players.Player(gameboard2);
    const player2 = players.ComputerPlayer(gameboard1);
    

    // temporarily place ships on two gameboards 
    for (let i=0; i<gameboard1.ships.length; i++) {
        gameBoard1.placeShip(i,0, ships[i], true);
    })
    for (let i=0; i<gameboard2ships.length; i++) {
        gameBoard2.placeShip(i,0, ships[i], true);
    })

    while (gameboard1.allShipsSunk() !== true || gameboard2.allShipsSunk() !== true) {
        players.handleTurn(player1, player2);
    }
}

module.exports = { Game }