import React, { useState } from "react";
import { Gameboards } from "./Gameboards";
import { InfoBoard } from "./InfoBoard";
import { PlayAgain } from "./PlayAgain";
import { Player } from "../factories/Player";
import { ComputerPlayer } from "../factories/ComputerPlayer";
import { gameBoardFactory } from "../factories/gameboardFactory";

export const Game = () => {
 
    const [gameboard1, setGameboard1] = useState(gameBoardFactory());
    const [gameboard2, setGameboard2] = useState(gameBoardFactory());
    const [player1, setPlayer1] = useState(Player(gameboard2));
    const [player2, setPlayer2] = useState(ComputerPlayer(gameboard1));
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

    const resetGame = () => {
        setGameboard1(gameBoardFactory());
        setGameboard2(gameBoardFactory());
        setPlayer1(Player(gameboard1));
        setPlayer2(ComputerPlayer(gameboard2));
        setGameOver(false);
        setWinner(null);
        setStartGame(false);
      }

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
                setGameboard1={setGameboard1}
                setGameboard2={setGameboard2}
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
            < PlayAgain 
                gameOver={gameOver} 
                resetGame={resetGame}
            /> 
        </div>
        
    )
}
