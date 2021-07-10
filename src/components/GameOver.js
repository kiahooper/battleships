import React, { useState } from "react";

const GameOver = (props) => {
    const {gameOver, winner} = props;
    
    return (
        <div>
            {winner === player1 ? <h1>Congrats! You win!</h1> : <h1>Game Over!</h1>}
        </div>
    )
}