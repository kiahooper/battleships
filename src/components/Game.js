import React, { useState } from "react";
import { Gameboard } from "./Gameboard";
import { PlaceShips } from "./PlaceShips";

export const Game = (props) => {
 
    const {player1, player2, gameboard1, gameboard2} = props;
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null); 
    const startGame = true;

    const checkForWinner = () => {
        if (gameboard2.allShipsSunk() === true) {
            setWinner(player1);
            setGameOver(true);
        } else if (gameboard1.allShipsSunk() === true) {
            setWinner(player2);
            setGameOver(true);
        }
    };  

    const GameOver = (props) => {
        const {winner} = props;
        return (
            <div>
                {winner === player1 ? <h1>Congrats! You win!</h1> : <h1>Game Over!</h1>}
            </div>
        )
    }

    return (
        <div>
            {gameOver ? < GameOver winner={winner}/> : null }
            {startGame ? 
            < Gameboard gameboard1={gameboard1} gameboard2={gameboard2} player1={player1} player2={player2} checkForWinner={checkForWinner} /> 
            : 
            < PlaceShips gameboard = {gameboard1}/>}
        </div>
        
    )
}
