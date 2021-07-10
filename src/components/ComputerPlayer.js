export const ComputerPlayer = (enemyGameBoard) => {

    /* develop minmax algorithm later for cleverer AI
    checkerboard method?
    */

    let previousAttacks = [];

    const attack = () => {

        let attackCoordX;
        let attackCoordY;
        let attack;

        attackCoordX = Math.floor(Math.random() * 10);
        attackCoordY = Math.floor(Math.random() * 10);
        attack = `${attackCoordX},${attackCoordY}`;

        while (previousAttacks.indexOf(attack) !== -1) {
            attackCoordX = Math.floor(Math.random() * 10);
            attackCoordY = Math.floor(Math.random() * 10);
            attack = `${attackCoordX},${attackCoordY}`;
        }
        
        previousAttacks.push(attack);
        enemyGameBoard.receiveAttack(attackCoordX, attackCoordY);
    }
    return {attack, previousAttacks}
}