import React, { useState } from "react";
import { Gameboards } from "./Gameboards";
import { InfoBoard } from "./InfoBoard";

export const Game = (props) => {
 
    const {player1, player2, gameboard1, gameboard2} = props;
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null); 
    const [startGame, setStartGame] = useState(false);
    const [turn, setTurn] = useState(true);
    const [attack, setAttack] = useState(null);

    const checkForWinner = () => {
        if (gameboard2.allShipsSunk() === true && gameboard1.allShipsSunk() !== true) {
            setWinner(player1);
            setGameOver(true);
        } else if (gameboard1.allShipsSunk() === true && gameboard2.allShipsSunk() !== true) {
            setWinner(player2);
            setGameOver(true);
        } else if (gameboard1.allShipsSunk() === true && gameboard2.allShipsSunk() === true) {
            setWinner("draw");
            setGameOver(true);
        }
    };  

    return (
        <div>
            < InfoBoard 
                gameOver={gameOver} 
                winner={winner} 
                player1={player1} 
                player2={player2} 
                attack={attack} 
                turn={turn}
                startGame={startGame}
            />
            < Gameboards 
                gameboard1={gameboard1} 
                gameboard2={gameboard2} 
                player1={player1} 
                player2={player2} 
                checkForWinner={checkForWinner} 
                startGame={startGame} 
                setStartGame={setStartGame}
                turn={turn}
                setTurn={setTurn}
                setAttack={setAttack}
                gameOver={gameOver}
            /> 
        </div>
        
    )
}
