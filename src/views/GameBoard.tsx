import { useEffect, useState } from "react"
import { GameType } from "../types"
import { getGames } from "../lib/apiWrapper"
import Game from "../components/Game"

type GameBoardProps = {}

export default function GameBoard({}: GameBoardProps) {
    const [games, setGames] = useState<GameType[]>([])
    useEffect( () => {
        async function fetchData(){
            const response = await getGames();
            if (response.data){
                let games = response.data;
                setGames(games)
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <h1 className="text-center">Game Board</h1>
            {games.map( game => <Game key={game.id} game={game} />)}
        </>
    )
}