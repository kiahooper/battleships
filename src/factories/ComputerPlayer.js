export const ComputerPlayer = (enemyGameBoard) => {

    let previousAttacks = [];
    let previousHit = null;
    let nextMove = "up";

    const attack = () => {
        let attack; 
        if (previousHit === null) {
            attack = getRandomAttack();
        } else if (previousHit !== null && checkIfShipIsSunk(previousHit)) {
            attack = getRandomAttack();
        } else {
            attack = getSurroundingAttack();
            if (!attack) {
                attack = getRandomAttack();
            }
        }
        previousAttacks.push(attack);
        let newAttack = enemyGameBoard.receiveAttack(attack.split(",")[0], attack.split(",")[1])
        if (newAttack === true || newAttack.name !== undefined) {
            previousHit = attack;
            nextMove = "up";
            return newAttack;
        }
        return false;
    }

    const getRandomAttack = () => {
        let coordX = Math.floor(Math.random() * 10);
        let coordY = Math.floor(Math.random() * 10);
        let attack = `${coordX},${coordY}`;
        
        while (previousAttacks.indexOf(attack) !== -1) {
            coordX = Math.floor(Math.random() * 10);
            coordY = Math.floor(Math.random() * 10);
            attack = `${coordX},${coordY}`;
        }
        return attack;
    }

    const getSurroundingAttack = () => {
        let coord = previousHit.split(",");
        let coordX = parseInt(coord[0]);
        let coordY = parseInt(coord[1]);
        let attack;

        if (nextMove === "up") {
            coordX--;
            attack = `${coordX},${coordY}`;
            nextMove = "right";
        } else if (nextMove === "right") {
            coordY++;
            attack = `${coordX},${coordY}`;
            nextMove = "down";
        } else if (nextMove === "down") {
            coordX++;
            attack = `${coordX},${coordY}`;
            nextMove = "left";
        } else if (nextMove === "left") {
            coordY--;
            attack = `${coordX},${coordY}`;
            nextMove = "up";
            previousHit = null;
        }

        while (previousAttacks.indexOf(attack) !== -1 || coordX < 0 || coordY < 0 || coordX > 9 || coordY > 9) {
            //console.log(attack)
            if (nextMove === "up" && previousHit !== null) {
                coordX--;
                attack = `${coordX},${coordY}`;
                nextMove = "right";
            } else if (nextMove === "right") {
                coordY++;
                attack = `${coordX},${coordY}`;
                nextMove = "down";
            } else if (nextMove === "down") {
                coordX++;
                attack = `${coordX},${coordY}`;
                nextMove = "left";
            } else if (nextMove === "left") {
                coordY--;
                attack = `${coordX},${coordY}`;
                nextMove = "up";
                previousHit = null;
            } else {
                    return false;
            }
        }
        return attack; 
    }

    const checkIfShipIsSunk = (coord) => {
        let shipSunk = false;
        enemyGameBoard.ships.forEach(ship => {
            if (ship.coords.indexOf(coord) !== -1) {
                shipSunk = ship.ship.isSunk()
            }
        }) 
        return shipSunk; 
    }

    return {attack, previousAttacks, checkIfShipIsSunk, getSurroundingAttack, getRandomAttack}
}