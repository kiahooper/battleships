export const ComputerPlayer = (enemyGameBoard) => {

    let previousAttacks = [];
    let previousHit = null;
    let nextMove = "up";

    const attack = () => {

        let attack; 
        console.log(previousHit)
        
        // not working 
        let shipSunk = checkIfShipIsSunk(previousHit)
        console.log(checkIfShipIsSunk(previousHit))
        

        if (previousHit === null) {
            console.log("random")
            attack = getRandomAttack();
        } else if (previousHit !== null && shipSunk) {
            // not working
            console.log("ship sunk random");
            attack = getRandomAttack();
        } else {
            attack = getSurroundingAttack();
            console.log("surrounding")
            if (!attack) {
                attack = getRandomAttack();
            }
        }

        previousAttacks.push(attack);
        
        if (enemyGameBoard.receiveAttack(attack.split(",")[0], attack.split(",")[1])) {
            previousHit = attack;
            nextMove = "up";
        }
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
            console.log(attack)
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

    const checkIfShipIsSunk = (previousHit) => {
        enemyGameBoard.ships.forEach(ship => {
            if (ship.coords.indexOf(previousHit) !== -1) {
                //console.log(previousHit)
                //console.log(ship.ship.isSunk())
                return ship.ship.isSunk()
            }
        }) 
        return false;
    }

    return {attack, previousAttacks}
}