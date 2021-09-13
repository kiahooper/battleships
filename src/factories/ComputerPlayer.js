export const ComputerPlayer = (enemyGameboard) => {

    let mode = "hunt";
    let previousAttacks = [];
    let hitTargets = [];
    let targets = [];
    let lineTargets = []; 
    let shipsSunk = [];

    const attack = () => {
        
        let attack;

        if (mode === "hunt") {
            attack = getHuntAttack();

        } else if (mode === "target") {
            attack = getTargetAttack();
        }

        previousAttacks.push(attack);
        let newAttack = enemyGameboard.receiveAttack(attack.split(",")[0], attack.split(",")[1]);

        if (newAttack.name !== undefined) {
            shipsSunk.push(newAttack.name);
            targets.length = 0;
            lineTargets.length = 0;
            hitTargets.length = 0
            mode = "hunt";
            return newAttack;

        } else if (newAttack === true) {
            addTargets(attack);
            mode = "target";
            return newAttack;
        }

        return false;
    }


    const addTargets = (hit) => {

        let coord = hit.split(",");
        let coordX = parseInt(coord[0]);
        let coordY = parseInt(coord[1]);

        targets.splice(0,0,[coordX,(coordY-1)], [coordX,(coordY+1)], [(coordX-1),coordY], [(coordX+1),coordY]);

        targets = filterTargets(targets);
        
        hitTargets.push(hit);

        if (hitTargets.length === 2) {
            lineTargets = filterTargetsForShipLines(targets, hitTargets);
        }
    }

    const getTargetAttack = () => {

        let coord; 

        targets = filterTargets(targets);

        if (lineTargets.length > 0) {
            coord = lineTargets[0];
            lineTargets.splice(0,1);

        } else {
            coord = targets[0];
            targets.splice(0,1);
        }

        let coordX = parseInt(coord[0]);
        let coordY = parseInt(coord[1]);
        let attack = `${coordX},${coordY}`;

        if (targets.length === 0) {
            mode = "hunt";
        }

        return attack
    }

    const filterTargets = (targetArr) => {

        // Filter for out of bounds 
        let filteredTargets = targetArr.filter(coord => (coord.filter(e => e >= 0 && e <= 9).length === 2));

        // Filter for previous hits
        filteredTargets = filteredTargets.filter(coord => previousAttacks.indexOf(coord.join(",")) === -1);

        return filteredTargets
    }

    const filterTargetsForShipLines = (targetArr, hitTargetArr) => {

        const x = hitTargetArr.map(coord => (coord.split(","))[0]);
        const y = hitTargetArr.map(coord => (coord.split(","))[1]);

        
        const xLen = [...new Set(x)].length;
        const yLen = [...new Set(y)].length;

        let filteredTargets;        
        if (xLen < yLen) {
            filteredTargets = targetArr.filter(coord => parseInt(coord[0]) === parseInt(x[0]));
        }
        else if (yLen < xLen) {
            filteredTargets = targetArr.filter(coord => parseInt(coord[1]) === parseInt(y[0]));
        }

        return filteredTargets;
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

        return (maxIndexes[(Math.floor(Math.random() * maxIndexes.length))]).join(",");
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
         filterTargets,
         filterTargetsForShipLines,
         getTargetAttack,
         previousAttacks,
         getHuntAttack,
         mapPreviousAttacks,
         canPlaceShip,
         calculateDensities,
         shipsSunk
        }
}