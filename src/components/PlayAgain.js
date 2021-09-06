export const PlayAgain = (props) => {

    const {gameOver, resetGame} = props;

    return (
        <div className={"overlay " + (gameOver ? "show" : "")}>
            <div className="playAgain">
            <h2>Ready for another battle?</h2>
            <button type="button" onClick={resetGame}>Play Again</button>
            </div>
        </div>
    )
}