import { useEffect, useState } from 'react';
import { Gameboard } from './Gameboard';
import { InfoBoard } from './InfoBoard';

export const PlaceShips = (props) => {

    const {gameboard, setStartGame, placeShips} = props;
    const [currentShipIndex, setCurrentShipIndex] = useState(0);
    const [axis, setAxis] = useState(false);
    const [canClick, setCanClick] = useState(true);

    // useEffect(() => {
    //     let currentShip = gameboard.ships[currentShipIndex].name
    //     setText(`Place your ${currentShip}`)
    // })

    const handlePlaceShips = (e) => {
        if (currentShipIndex < 5) {
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            let direction = axis ? 1 : 0;
            if (placeShips(x,y,gameboard.ships[currentShipIndex], direction) === false) {
                return;
            } else if (currentShipIndex === 4) {
                setCurrentShipIndex(0);
                setCanClick(false);
                setStartGame(true);
            } else {
                setCurrentShipIndex(currentShipIndex + 1)
            }
        }
    }

    return (
        <div>
            <button onClick={() => {setAxis(!axis)}}>{axis ? 'Horizontal' : 'Vertical'}</button>
            < Gameboard gameboard={gameboard.board} canClick={canClick} handleClick={handlePlaceShips} placeShips={true}/>
        </div>
    )
}