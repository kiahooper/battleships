import { useEffect, useState } from "react";

export const InfoBoard = (props) => {

    const {gameOver, winner, player1, player2, attack, turn, startGame} = props;

    const [text, setText] = useState("");

    useEffect(() => {
        if (startGame === false && gameOver === false) {
            setText("Station your ships, Admiral.");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startGame])

    useEffect(() => {
        if (startGame === true && gameOver === false) {
            if (turn === true) {
                setText("Awaiting orders, Admiral...");
            } else if (turn === false) {
                setText("Enemy aims...");
            }
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn, startGame])

    useEffect(() => {
        if (attack === true) {
            setText("HIT!");
        } else if (attack === false) {
            setText("MISS!");
        } else if (typeof attack === 'object' && attack !== null && !Array.isArray(attack)) {
            let shipName = attack.name;
            if (turn === true) {
                setText(`You sunk the enemy's ${shipName}!`);
            } else if (turn === false) {
                setText(`Your ${shipName} was destroyed!`);
            }
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attack])

    useEffect(() => {
        if (gameOver === true) {
            if (winner === player1) {
                setText("The enemy fleet has been destroyed!");
            } else if (winner === player2) {
                setText("Game Over, your fleet has been sunk!");
            } else {
                setText("It's a draw!");
            }
        }
    }, [gameOver, winner, attack, player1, player2])

    return (
            <div className="infoBoard">
                <h2 key={Math.random()}>{text}</h2> 
            </div> 
   
    )
}