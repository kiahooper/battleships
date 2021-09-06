export const PlayAgain = (props) => {
    const {gameOver, setGameOver, setStartGame, gameboard1, gameboard2, setBoard1, setBoard2} = props;

    const startGame = () => {
        gameboard1.clearBoard()
        gameboard2.clearBoard()
        setBoard1(gameboard1.board);
        setBoard2(gameboard2.board);
        setStartGame(false);
        setGameOver(false);
    }

    return (
        <div className={"overlay " + (gameOver ? "show" : "")}>
            <div className="playAgain">
            <h2>Ready for another battle?</h2>
            <button type="button" onClick={startGame}>Play Again</button>
            </div>
        </div>
    )
}