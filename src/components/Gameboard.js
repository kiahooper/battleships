export const Gameboard = (props) => {

    const {gameboard, canClick, handleClick, placeShips, computer} = props;
    
    console.log(gameboard)

    const getItemClassName = (item) => {
        if (item === "#" && !computer) {
            return 'ship'
        } else if (item === "~") {
            return 'miss'
        } else if (item === "x") {
            return 'hit'
        } else if (item === "+") {
            return 'sunk'
        } else {
            return ''
        }
    }

    return (
        <div className={`gameboard ${computer ? "computer" : ""}`}>
        <h2>{computer ? "Enemy Waters" : "Friendly Waters"}</h2>
        <div className="grid" onClick={(e) => canClick ? handleClick(e) : () => false}>
            {gameboard.map((items, index) => {
                return (
                    items.map((item, sIndex) => {
                        return (
                            <div className={getItemClassName(item)} key={`${index},${sIndex}`} data-x={index} data-y={sIndex}>{ item === "#" && computer && !placeShips ? "": item }</div>
                        )
                    })
                )
            })}
        </div>
        </div>
    )
}