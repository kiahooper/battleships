import { useState } from 'react';
import { Gameboard } from './Gameboard';
import carrier from '../assets/carrier.png';
import battleship from '../assets/battleship.png';
import destroyer from '../assets/destroyer.png';
import submarine from '../assets/submarine.png';
import cruiser from '../assets/cruiser.png';

export const PlaceShips = (props) => {

    const {gameboard, setStartGame, placeShips} = props;
    const [currentShipIndex, setCurrentShipIndex] = useState(0);
    const [axis, setAxis] = useState(false);

    const shipPng = [carrier, battleship, destroyer, submarine, cruiser];
    
    const handlePlaceShips = (e) => {
        if (currentShipIndex < 5) {
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            let direction = axis ? 1 : 0;
            if (placeShips(x,y,gameboard.ships[currentShipIndex], direction) === false) {
                return;
            } else if (currentShipIndex === 4) {
                setCurrentShipIndex(0);
                setStartGame(true);
            } else {
                setCurrentShipIndex(currentShipIndex + 1)
            }
        }
    }

    return (
        <div className="placeShips">
            <div className="placeShipsInfo">
            <p>Place highlighted ship by clicking on gameboard. <br></br>Click on button below to choose orientation of ship.</p>
            <button className={`slide_${axis ? 'horizontal' : 'vertical'}`} onClick={() => {setAxis(!axis)}}>{axis ? 'Horizontal' : 'Vertical'}</button>
            <div className="ships">
                {gameboard.ships.map((ship, index) => {
                    return (
                        <div className="ship">
                            <img src={shipPng[index]} alt={ship.name}></img>
                            <div className="shipName"><p>{ship.name}</p></div>
                        {ship.ship.coords.map(item => {
                            return (
                                <div className={`shipItem ${currentShipIndex === index ? "currentShip" : ""}`}>{item}</div>
                            )
                        })}
                        </div>
                    )
                    })}
            </div>
            </div>
            < Gameboard gameboard={gameboard.board} canClick={true} handleClick={handlePlaceShips} placeShips={true}/>
        </div>
    )
}