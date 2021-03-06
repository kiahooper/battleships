import React, { useEffect, useState } from "react";
import { Gameboard } from './Gameboard';
import { PlaceShips } from "./PlaceShips";
import { Accordion } from "./Accordion";


export const Gameboards = (props) => {

const {
  gameboard1, 
  gameboard2, 
  setGameboard1,
  setGameboard2,
  player1, 
  player2, 
  checkForWinner, 
  startGame, 
  setStartGame,
  turn,
  setTurn,
  setAttack,
  gameOver
} = props;

const [canClick, setCanClick] = useState(true);

const sleep = m => new Promise(r => setTimeout(r, m))

useEffect(() => {
  async function handleComputerTurn() {
    try {
      await sleep(1000);
      let attack = player2.attack()
      await setAttack(attack);
      setGameboard2({...gameboard2});
      await sleep(1200);
      await setAttack(null);      
      await checkForWinner()
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
    setGameboard1({...gameboard1});
    await sleep(1200)
    await setAttack(null);
    await setTurn(false);
}

  return (
    <div>
      {startGame ? 
        <div className="gameboards">
          < Gameboard 
            gameboard={gameboard1} 
            canClick={false} 
            placeShips={false}
            computer={false}
          />
          < Accordion nameOfClass="gameRules" title="Rules" content={
          <div>
            <p>Players have stationed their ships at unknown coordinates.</p>
            <p>Players will take turn taking a shot at opponent's grid.</p>
            <p>Game Over when a player's ships have all been sunk.</p>
            <div>
            <p><span className="bold red">Red:</span> Target is hit</p>
            <p><span className="bold blue">Blue:</span> Target is missed</p>
            <p><span className="bold green">Green:</span> Ship has been sunk</p>
            </div>
          </div>}/>
          < Gameboard 
            gameboard={gameboard2} 
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