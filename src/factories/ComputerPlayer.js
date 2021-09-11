export const ComputerPlayer = (enemyGameboard) => {

    let mode = "hunt";
    let previousAttacks = [];
    let successfullTargets = [];
    let targets = [];
    let shipsSunk = [];

    const attack = () => {

        let attack;

        if (mode === "hunt") {
            attack = getHuntAttack();

        } else if (mode === "target") {
            attack = getTargetAttack();
        }

        console.log(attack)

        previousAttacks.push(attack);
        let newAttack = enemyGameboard.receiveAttack(attack.split(",")[0], attack.split(",")[1]);

        if (newAttack === true) {
            if (newAttack.name !== undefined) {
                shipsSunk.push(newAttack.name);
                targets.splice(0, targets.length);
                successfullTargets.splice(0, targets.length);
                mode = "hunt";
            } else {
                addTargets(attack);
                mode = "target";
            }
            return newAttack;
        }
        return false;
    }


    const addTargets = (hit) => {

        let coord = hit.split(",");
        let coordX = parseInt(coord[0]);
        let coordY = parseInt(coord[1]);

        targets.splice(0,0,[coordX,(coordY-1)], [coordX,(coordY+1)], [(coordX-1),coordY], [(coordX+1),coordY]);

        successfullTargets.push(hit);

        filterTargets(targets);
    }

    const getTargetAttack = () => {

        let coord = targets[0];
        let coordX = parseInt(coord[0]);
        let coordY = parseInt(coord[1]);
        let attack = `${coordX},${coordY}`;

        targets.splice(0,1);

        if (targets.length === 0) {
            mode = "hunt";
        }

        return attack
    }

    const filterTargets = (targets) => {

        // Filter for out of bounds 
        let filteredTargets = targets.filter(coord => (coord.filter(e => e >= 0 && e <= 9).length === 2));

        // Filter for previous hits
        filteredTargets = filteredTargets.filter(coord => previousAttacks.indexOf(coord.join(",")) === -1);

        // Filter for orientation
        if (successfullTargets.length === 2) {
            const x = successfullTargets.map(coord => (coord.split(","))[0]);
            const y = successfullTargets.map(coord => (coord.split(","))[1]);
            const xLen = [...new Set(x)].length;
            const yLen = [...new Set(y)].length;

            if (xLen < yLen) {
                filteredTargets = filteredTargets.filter(coord => parseInt(coord[0]) === parseInt(x[0]));
            }
            else {
                filteredTargets = filteredTargets.filter(coord => parseInt(coord[0]) === parseInt(y[0]));
            }
        }

        targets.splice(0, targets.length);
        filteredTargets.map(coord => targets.push(coord));
    }


   const getHuntAttack = () => {

        let densityMap = Array(10).fill().map(() => Array(10).fill(0));

        densityMap = mapPreviousAttacks(densityMap);

        densityMap = calculateDensities(densityMap);

        let maxPropability = densityMap.map(row => Math.max(...row.filter(item => !isNaN(item))));
        maxPropability = Math.max(...maxPropability);
        
        let maxIndexes = [];

        for (let i=0; i<densityMap.length; i++) {
            for (let j=0; j<densityMap[i].length; j++) {
                if (densityMap[i][j] === maxPropability) {
                    maxIndexes.push([i,j])
                }
            }
        }

        console.log(maxIndexes)
        //return maxIndex;
    }

    const calculateDensities = (densityMap) => {

        const activeShips = enemyGameboard.ships.filter(ship => !shipsSunk.includes(ship.name));
                
        for(let z=0; z<2; z++) {
            for(let i=0; i<activeShips.length; i++) {
                for (let x=0; x<densityMap.length; x++) {
                    for (let y=0; y<densityMap[x].length; y++) {
                        if (canPlaceShip(x, y, activeShips[i].ship, z, densityMap) === true) {
                            for (let j=0; j<activeShips[i].ship.len; j++) {
                                if (z === 0) {
                                    densityMap[x][y+j]++
                                } else {
                                    densityMap[x+j][y]++
                                }
                            }
                        }
                    }
                }
            }
        }

        return densityMap
    }

    const canPlaceShip = (x,y,ship,direction, board) => {
            
        let canPlaceShip = false;

        if (direction === 0) {
            for (let i=0; i<ship.len; i++) {
                if (y + i > 9) {
                    canPlaceShip = false
                    break;
                }
                else if (!isNaN(board[x][y+i])) {
                    canPlaceShip = true;
                } else {
                    canPlaceShip = false;
                    break;
                }
            }
        }
        else if (direction === 1) {
            for (let i=0; i<ship.len; i++) {
                    if (x + i > 9) {
                        canPlaceShip = false
                        break;
                    }
                    else if (!isNaN(board[x+i][y])) {
                        canPlaceShip = true;
                    } else {
                        canPlaceShip = false;
                        break;
                    }
                }   
            }
        return canPlaceShip
    }       
    
    const mapPreviousAttacks = (densityMap) => {
        if (previousAttacks.length > 0) {
            previousAttacks.map(attack => {
                const x = attack.split(",")[0];
                const y = attack.split(",")[1];
                densityMap[x][y] = "X";
                return true;
            })
        }
        return densityMap
    }

     return {
         attack,
         addTargets,
         targets,
         getTargetAttack,
         previousAttacks,
         getHuntAttack,
         mapPreviousAttacks,
         canPlaceShip,
         calculateDensities,
         shipsSunk
        }
}