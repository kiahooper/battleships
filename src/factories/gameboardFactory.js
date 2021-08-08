import { shipFactory } from "./Ship";

const gameBoardFactory = () => {

    const board = Array(10).fill().map(() => Array(10).fill(""));

    const ships = [
        {name: 'Carrier', ship: shipFactory(5), coords: []}, 
        {name: 'Battleship', ship: shipFactory(4), coords: []}, 
        {name: 'Cruiser', ship: shipFactory(3), coords: []}, 
        {name: 'Submarine', ship: shipFactory(3), coords: []}, 
        {name: 'Destroyer', ship: shipFactory(2), coords: []}
        ] 

    const placeShip = (startCoordX, startCoordY, ship, direction) => {
        
        let canPlaceShip = false;

        try {
            // horizontal placement
            if (direction === 0) {
                for (let i=0; i<ship.ship.len; i++) {
                        if (board[startCoordX][startCoordY+i] === "") {
                            canPlaceShip = true;
                        } else {
                            canPlaceShip = false;
                            break;
                        }
                    }
                if (canPlaceShip) {
                    for (let i=0; i<ship.ship.len; i++) {
                        ship.coords.push(`${startCoordX},${startCoordY+i}`)
                        board[startCoordX][startCoordY+i] = ship.ship.coords[i]
                    }
                } else {
                    return false;
                }
            // vertical placement    
            } else if (direction === 1) {
                for (let i=0; i<ship.ship.len; i++) {
                    if (board[startCoordX+i][startCoordY] === "") {
                        canPlaceShip = true;
                    } else {
                        canPlaceShip = false;
                        break;
                    }
                }
                if (canPlaceShip) {
                    for (let i=0; i<ship.ship.len; i++) {
                        ship.coords.push(`${startCoordX+i},${startCoordY}`)
                        board[startCoordX+i][startCoordY] = ship.ship.coords[i];
                    }
                } else {
                    return false;
                }
            }
        // Catch eg. boundary error of gameboard
        } catch(err) {
            console.log(err)
            return false;
        }   
    }

    const placeShipsRandom = () => {
        ships.forEach(ship => {
            let posX = Math.floor(Math.random() * 10);
            let posY = Math.floor(Math.random() * 10);
            let direction = Math.floor(Math.random() * 2);
            while (placeShip(posX, posY, ship, direction) === false) {
                posX = Math.floor(Math.random() * 10);
                posY = Math.floor(Math.random() * 10);
                direction = Math.floor(Math.random() * 2);
            };
        });
    };

    const receiveAttack = (attackCoordX, attackCoordY) => {
        if (board[attackCoordX][attackCoordY] === '#') {
            for(let i=0; i<ships.length; i++) {
                const index = ships[i].coords.indexOf(`${attackCoordX},${attackCoordY}`);
                if (index !== -1) {
                    board[attackCoordX][attackCoordY] = ships[i].ship.hit(index);
                    if (ships[i].ship.isSunk()) {
                        markShipAsSunk(ships[i]);
                        return ships[i];
                    };
                    return true;
                }
            } 
        } else if (board[attackCoordX][attackCoordY] === 'X') {
            return false;
        }
        board[attackCoordX][attackCoordY] = '~';
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

    const markShipAsSunk = (ship) => {
        ship.coords.forEach(item => {
            let coord = item.split(",");
            board[coord[0]][coord[1]] = "+"; 
        })
    }

    const clearBoard = () => {

        ships.forEach(ship => {
            ship.coords = [];
        });

        for(let i=0; i<board.length; i++) {
            for(let j=0; j<board.length; j++) {
                board[i][j] = "";
            }
        }
    }

    return {placeShip, board, ships, receiveAttack, allShipsSunk, clearBoard, placeShipsRandom}
}

export {gameBoardFactory}