import React from "react";
import { Game } from "./Game";
const { Player } = require("./Player");
const { ComputerPlayer } = require("./ComputerPlayer");
const { gameBoardFactory } = require("./gameboardFactory");

export const Home = () => {

    // Game initialization
    const gameboard1 = gameBoardFactory();
    const gameboard2 = gameBoardFactory();
    const player1 = Player(gameboard2);
    const player2 = ComputerPlayer(gameboard1);

    return (
        <div>
            <h1>Battleships</h1>
            < Game gameboard1={gameboard1} gameboard2={gameboard2} player1={player1} player2={player2} />
        </div>
    )
}