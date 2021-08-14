import { useState } from 'react';
import { Gameboard } from './Gameboard';

export const PlaceShips = (props) => {

    const {gameboard, setStartGame, placeShips} = props;
    const [currentShipIndex, setCurrentShipIndex] = useState(0);
    const [axis, setAxis] = useState(false);

    // context??
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
                setStartGame(true);
            } else {
                setCurrentShipIndex(currentShipIndex + 1)
            }
        }
    }

    return (
        <div className="placeShips">
            <button onClick={() => {setAxis(!axis)}}>{axis ? 'Horizontal' : 'Vertical'}</button>
            < Gameboard gameboard={gameboard.board} canClick={true} handleClick={handlePlaceShips} placeShips={true}/>
        </div>
    )
}