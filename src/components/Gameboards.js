import React, { useEffect, useState } from "react";
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
  turn,
  setTurn,
  setAttack,
  gameOver
} = props;

const [board1, setBoard1] = useState(gameboard1.board);
const [board2, setBoard2] = useState(gameboard2.board);
const [canClick, setCanClick] = useState(true);

const sleep = m => new Promise(r => setTimeout(r, m))

useEffect(() => {
  async function handleComputerTurn() {
    try {
      await sleep(1000);
      let attack = player2.attack()
      await setAttack(attack);
      checkForWinner()
      setBoard2([...board2]);
      await sleep(1000);
      await setAttack(null);
      await setTurn(true);
      setCanClick(true);
    } catch (err) {
      console.log(err);
    }
  }
  if (!turn && !gameOver) {
    handleComputerTurn();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [turn]);


const placeShips = (startCoordX, startCoordY, ship, direction) => {
  if (gameboard1.placeShip(startCoordX,startCoordY,ship, direction) === false){
    return false
  } else {
    if (ship.coords.length === 2) {
      gameboard2.placeShipsRandom()
    }
  }
}

async function handleTurn(e) {
    let newAttack;
    try {
      newAttack = player1.attack(e.target.dataset.x, e.target.dataset.y);  
    } catch (err) {
      console.log(err.message);
      return;
    }
    setCanClick(false)
    await setAttack(newAttack);
    checkForWinner();
    setBoard1([...board1]);
    await sleep(1000)
    await setAttack(null);
    await setTurn(false);
}


  return (
    <div>
      {startGame ? 
        <div className="gameboards">
          < Gameboard 
            gameboard={board1} 
            canClick={false} 
            placeShips={false}
            computer={false}
          />
          < Gameboard 
            gameboard={board2} 
            canClick={canClick} 
            handleClick={handleTurn} 
            placeShips={false}
            computer={true}
          />
        </div>
        : 
        < PlaceShips 
          gameboard={gameboard1} 
          setStartGame={setStartGame} 
          placeShips={placeShips}
          computer={false}
        />
        }
    </div>
  );
};