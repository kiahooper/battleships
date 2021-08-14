export const Gameboard = (props) => {

    const {gameboard, canClick, handleClick, placeShips, computer} = props;

    return (
        <div className={`gameboardGrid ${computer ? "computerGrid" : ""}`} onClick={(e) => canClick ? handleClick(e) : () => false}>
            {gameboard.map((items, index) => {
                return (
                    items.map((item, sIndex) => {
                        return (
                            <div key={`${index},${sIndex}`} data-x={index} data-y={sIndex}>{ item === "#" && computer && !placeShips ? "" : item }</div>
                        )
                    })
                )
            })}
        </div>)
}