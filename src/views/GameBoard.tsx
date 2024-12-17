import { useEffect, useState } from "react"
import { CategoryType, GameType, PickType } from "../types"
import { getGames, getMyPicks } from "../lib/apiWrapper"
import Game from "../components/Game"

type GameBoardProps = {
    flashMessage: (message:string, category:CategoryType) => void;
}

export default function GameBoard({ flashMessage }: GameBoardProps) {
    const [games, setGames] = useState<GameType[]>([]);
    const [myPicks, setMyPicks] = useState<PickType[]>([]);

    const fetchMyPicksData = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await getMyPicks(token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            setMyPicks(response.data!)
        }
    }

    useEffect( () => {
        async function fetchData(){
            const response = await getGames();
            if (response.data){
                let games = response.data;
                games = games.filter( game => new Date(game.kickoff_time) > new Date() ).sort( (a, b) => new Date(a.kickoff_time) > new Date(b.kickoff_time) ? 1 : -1 )
                setGames(games)
            }
        }

        fetchData();
    }, [])

    useEffect( () => {
        fetchMyPicksData()
    }, [] )

    return (
        <>
            <h1 className="text-center">Game Board</h1>
            {games.map( game => <Game key={game.id} game={game} myPicks={myPicks} flashMessage={flashMessage} updateMyPicks={fetchMyPicksData}/>)}
        </>
    )
}