import React, { useState } from "react";
import '../styles/Gameboard.css';

const Gameboard = (props) => {

const {gameboard1, gameboard2, player1, player2, checkForWinner} = props;
const [board1, setBoard1] = useState(gameboard1.board);
const [board2, setBoard2] = useState(gameboard2.board);

const placeShips = () => {
    // Place ships randomly on computer player's board
   gameboard1.clearBoard()
   gameboard1.ships.forEach(ship => {
        let posX = Math.floor(Math.random() * 10);
        let posY = Math.floor(Math.random() * 10);
        let direction = Math.floor(Math.random() * 2);
        while (gameboard1.placeShip(posX, posY, ship, direction) === false) {
            posX = Math.floor(Math.random() * 10);
            posY = Math.floor(Math.random() * 10);
            direction = Math.floor(Math.random() * 2);
        };
        
    });
    setBoard1([...board1]);   
    
    // Place ships randomly on player's board
    gameboard2.clearBoard()
    gameboard2.ships.forEach(ship => {
         let posX = Math.floor(Math.random() * 10);
         let posY = Math.floor(Math.random() * 10);
         let direction = Math.floor(Math.random() * 2);
         while (gameboard2.placeShip(posX, posY, ship, direction) === false) {
             posX = Math.floor(Math.random() * 10);
             posY = Math.floor(Math.random() * 10);
             direction = Math.floor(Math.random() * 2);
         };
         
     });
     setBoard2([...board2]);
     
    
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
        <button onClick={placeShips}>Place Ships</button>
        <div className="gameboards">
            < GameBoardElement gameboard={board1} canClick={false} />
            < GameBoardElement gameboard={board2} canClick={true}/>
        </div>
      </div>

    
  );
};

export default Gameboard;
