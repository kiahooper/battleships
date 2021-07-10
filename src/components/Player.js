
const Player = (enemyGameBoard) => {

        const attack = (attackCoordX, attackCoordY) => {
            return enemyGameBoard.receiveAttack(attackCoordX, attackCoordY);
            
        }
        return {attack}
    }



export {Player}

