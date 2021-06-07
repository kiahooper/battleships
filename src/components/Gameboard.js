import { shipFactory } from "./Ship";

const gameBoardFactory = () => {

    const board = Array(10).fill().map(() => Array(10).fill(0));

    const ships = [
        {name: 'Carrier', ship: shipFactory(5), coords: []}, 
        {name: 'Battleship', ship: shipFactory(4), coords: []}, 
        {name: 'Cruiser', ship: shipFactory(3), coords: []}, 
        {name: 'Submarine', ship: shipFactory(3), coords: []}, 
        {name: 'Destroyer', ship: shipFactory(2), coords: []}
        ] 

    const placeShip = (startCoordX, startCoordY, ship, direction) => {

        if (direction === true) {
            //board[startCoordX].splice(startCoordY, ship.ship.len, ...ship.ship.coords); beautiful but dont need it :( )
            for (let i=0; i<ship.ship.len; i++) {
                board[startCoordX][startCoordY+i] = '#';
                ship.coords.push(`${startCoordX},${startCoordY+i}`)
                }
        } else {
            for (let i=0; i<ship.ship.len; i++) {
                board[startCoordX+i][startCoordY] = '#';
                ship.coords.push(`${startCoordX+i},${startCoordY}`)
                }
            }
        }

    const receiveAttack = (attackCoordX, attackCoordY) => {
        if (board[attackCoordX][attackCoordY] === '#') {
            for(let i=0; i<ships.length; i++) {
                const index = ships[i].coords.indexOf(`${attackCoordX},${attackCoordY}`);
                if (index !== -1) {
                    return ships[i].ship.hit(index);
                }
            } 
        } 
        board[attackCoordX][attackCoordY] = 'O';
        return false;
    };

    const allShipsSunk = () => {
        if (ships[0].ship.isSunk() === true &&
            ships[1].ship.isSunk() === true &&
            ships[2].ship.isSunk() === true &&
            ships[3].ship.isSunk() === true &&
            ships[4].ship.isSunk() === true) {
                return true
            }
            return false
    }

    return {placeShip, board, ships, receiveAttack, allShipsSunk}
}

module.exports = {gameBoardFactory}