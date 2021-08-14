export const Player = (enemyGameBoard) => {

        const attack = (coordX, coordY) => {
            return enemyGameBoard.receiveAttack(coordX, coordY);
            
        }
        return {attack}
    }