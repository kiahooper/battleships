import React, { useState } from "react";
import '../styles/Gameboard.css';

export const Gameboard = (props) => {

const {gameboard1, gameboard2, player1, player2, checkForWinner} = props;
const [board1, setBoard1] = useState(gameboard1.board);
const [board2, setBoard2] = useState(gameboard2.board);

const placeShips = (howToPlace) => {

    // Place ships randomly on computer player's board
    gameboard1.clearBoard()
    gameboard1.placeShipsRandom()
    setBoard1([...board1]);   

    // Place ships on player's board
    gameboard2.clearBoard()
    if (howToPlace === "random") {
        gameboard2.placeShipsRandom()
        setBoard2([...board2]);
    } else {
        
    }
    
}

const handleTurn = (e) => {
    try {
        player1.attack(e.target.dataset.x, e.target.dataset.y);
        player2.attack();
        checkForWinner();
        setBoard1([...board1]);
        setBoard2([...board2]);
    } catch(err) {
        console.log(err);
    }
}

const GameBoardElement = (props) => {
    const {gameboard, canClick} = props;
    return (
        <div className="gameboard-grid" onClick={(e) => canClick ? handleTurn(e) : () => false}>
            {gameboard.map((items, index) => {
                return (
                    items.map((item, sIndex) => {
                        return (
                            <div key={`${index},${sIndex}`} data-x={index} data-y={sIndex}>{ item === "#" && canClick ? "" : item }</div>
                        )
                    })
                )
            })}
        </div>)
}

  return (
      <div>
        <button onClick={()=>{placeShips("random")}}>Place Ships Randomly</button>
        <div className="gameboards">
            < GameBoardElement gameboard={board1} canClick={false} />
            < GameBoardElement gameboard={board2} canClick={true}/>
        </div>
      </div>

    
  );
};