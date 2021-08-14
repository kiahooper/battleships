import { useEffect, useState } from "react";

export const InfoBoard = (props) => {

    const {gameOver, winner, player1, attack, turn, startGame} = props;

    const [text, setText] = useState("");

    useEffect(() => {
        if (!startGame) {
            setText("Station your ships, Admiral.");
        }
    }, [startGame])

    useEffect(() => {
        if (startGame) {
            if (turn === true) {
                setText("Awaiting orders, Admiral...");
            } else if (turn === false) {
                setText("Enemy aims...");
            }
        }
    }, [turn, startGame])

    useEffect(() => {
        if (attack === true) {
            setText("HIT!");
        } else if (attack === false) {
            setText("MISS!");
        } else if (typeof attack === 'object' && attack !== null && !Array.isArray(attack)) {
            let shipName = attack.name;
            if (turn === false) {
                setText(`You sunk the enemy's ${shipName}!`);
            } else if (turn === true) {
                setText(`Your ${shipName} was destroyed!`);
            }
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attack])

    useEffect(() => {
        if (gameOver) {
            if (winner === player1) {
                setText("Congrats, the enemy fleet has been destroyed!");
            } else {
                setText("Game Over, your fleet has been sunk!");
            }
        }
    }, [gameOver, winner, attack, player1])

    return (
            <div className="infoBoard">
                <h2 key={Math.random()}>{text}</h2> 
            </div> 
   
    )
}