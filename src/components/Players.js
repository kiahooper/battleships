const Players = () => {

    let turn = true;

    const handleTurn = (player1, player2) => {
        if (turn) {
            player1.move()
        } else {
            player2.move()
        }
        turn = !turn;
    }

    const Player = (enemyGameBoard) => {
        const move = () => {
            attack(0,0)
        }
        const attack = (attackCoordX, attackCoordY) => {
            return enemyGameBoard.receiveAttack(attackCoordX, attackCoordY);
            
        }
        return {move, attack}
    }

    const ComputerPlayer = (enemyGameBoard) => {

        const move = () => {
            attack();
        }

        let previousAttacks = [];

        const attack = () => {
            let attackCoordX = Math.floor(Math.random() * 10);
            let attackCoordY = Math.floor(Math.random() * 10);
            let attack = `${attackCoordX},${attackCoordY}`;
            while (previousAttacks.indexOf(attack) !== -1) {
                attackCoordX = Math.floor(Math.random() * 10)
                attackCoordY = Math.floor(Math.random() * 10)
            }
            previousAttacks.push(attack);
            return enemyGameBoard.receiveAttack(attackCoordX, attackCoordY);
        }

        return {move, attack, previousAttacks}
    }

    return {Player, ComputerPlayer, handleTurn, turn}
}

module.exports = {Players}

