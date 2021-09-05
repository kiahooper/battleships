import React, { useState } from "react";
import { Gameboards } from "./Gameboards";
import { InfoBoard } from "./InfoBoard";
import { PlayAgain } from "./PlayAgain";

export const Game = (props) => {
 
    const {player1, player2, gameboard1, gameboard2} = props;
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null); 
    const [startGame, setStartGame] = useState(false);
    const [turn, setTurn] = useState(true);
    const [attack, setAttack] = useState(null);

    const [board1, setBoard1] = useState(gameboard1.board);
const [board2, setBoard2] = useState(gameboard2.board);

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
                board1={board1}
                board2={board2}
                setBoard1={setBoard1}
                setBoard2={setBoard2}
            />
            < PlayAgain 
                gameOver={gameOver} 
                setGameOver={setGameOver} 
                setStartGame={setStartGame} 
                gameboard1={gameboard1} 
                gameboard2={gameboard2}
                setBoard1={setBoard1}
                setBoard2={setBoard2}
            /> 
        </div>
        
    )
}
