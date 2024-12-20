import { useEffect, useState } from "react"
import { GamePickType } from "../types"
import { getGames } from "../lib/apiWrapper"
import GamePick from "../components/GamePick"

type GamePicksProps = {}

export default function GamePicks({}: GamePicksProps) {
    const [games, setGames] = useState<GamePickType[]>([]);

    useEffect( () => {
        async function fetchData(){
            const response = await getGames(true);
            if (response.data){
                let games = (response.data as GamePickType[]);
                games = games.sort( (a, b) => new Date(a.kickoff_time) > new Date(b.kickoff_time) ? 1 : -1 )
                setGames(games)
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <h1 className="text-center">Game Picks</h1>
            {games.map( game => <GamePick key={game.id} game={game} />)}
        </>
    )
}