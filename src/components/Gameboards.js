import React, { useEffect, useState } from "react";
import '../styles/Gameboard.css';
import { Gameboard } from './Gameboard';
import { PlaceShips } from "./PlaceShips";


export const Gameboards = (props) => {

const {
  gameboard1, 
  gameboard2, 
  player1, player2, 
  checkForWinner, 
  startGame, 
  setStartGame,
  setText,
} = props;

const [board1, setBoard1] = useState(gameboard1.board);
const [board2, setBoard2] = useState(gameboard2.board);
const [canClick, setCanClick] = useState(true);

const placeShips = (startCoordX, startCoordY, ship, direction) => {
  if (gameboard1.placeShip(startCoordX,startCoordY,ship, direction) === false){
    return false
  } else {
    if (ship.coords.length === 2) {
      gameboard2.placeShipsRandom()
    }
  }
}

const handleTurn = (e) => {
    try {
        setCanClick(false);
        let attack = player1.attack(e.target.dataset.x, e.target.dataset.y);
        setText(checkAttack(attack));
        checkForWinner();
        setBoard1([...board1]);
        setTimeout(() => {
          setText('Enemy aims...')
          let attack = player2.attack();        
          checkForWinner();
          setTimeout(() => {
            setText(checkAttack(attack))
          }, 1000)
          setBoard2([...board2]);
          setCanClick(true)
        }, 1200);
        

    } catch(err) {
        console.log(err);
    }
}

const checkAttack = (attack) => {
  if (attack !== true && attack !== false) {
    return `Enemy's ${attack.name} was sunk!`
  } else {
    return attack ? "Hit!" : "Miss!";
  }

}

  return (
    <div>
      {startGame ? 
        <div className="gameboards">
          < Gameboard 
            gameboard={board1} 
            canClick={false} 
            placeShips={false}
            computer={true}
          />
          < Gameboard 
            gameboard={board2} 
            canClick={canClick} 
            handleClick={handleTurn} 
            placeShips={false}
            computer={false}
          />
        </div>
        : 
        < PlaceShips 
          gameboard={gameboard1} 
          setStartGame={setStartGame} 
          placeShips={placeShips}
        />
        }
    </div>
  );
};