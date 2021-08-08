export const InfoBoard = (props) => {

    const {text, gameOver, winner, player1} = props;

    const GameOver = () => {
        if (winner === player1) {
            return <h2>Congrats, the enemy fleet has been destroyed!</h2> 
        } 
        return <h2>Game Over, your fleet has been sunk!</h2>
    }

    return (
        <div>
        {gameOver ?
            <GameOver/>
        :
        <h2>{text}</h2>   
        }
        </div>

        
            
    )
}