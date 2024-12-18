import { useState, useEffect } from 'react';
import { CategoryType, GameType, PickType } from '../types';
import { getMyPicks, getGames } from '../lib/apiWrapper';
import Table from 'react-bootstrap/Table';


type Props = {
    flashMessage: (message:string, category:CategoryType) => void;
}

export default function MyPicks({ flashMessage }: Props) {
    const [games, setGames] = useState<GameType[]>([]);
    const [picks, setPicks] = useState<PickType[]>([]);

    const fetchMyPicksData = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await getMyPicks(token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            setPicks(response.data!)
        }
    }

    useEffect( () => {
        async function fetchData(){
            const response = await getGames();
            if (response.data){
                let games = response.data;
                // games = games.filter( game => new Date(game.kickoff_time) > new Date() ).sort( (a, b) => new Date(a.kickoff_time) > new Date(b.kickoff_time) ? 1 : -1 )
                setGames(games)
            }
        }

        fetchData();
    }, [])

    useEffect( () => {
        fetchMyPicksData()
    }, [] )

    const userSelection = (selection: string, game: GameType) => {
        let favorite = game.spread < 0 ? game.team_1 : game.team_2
        let underdog = game.spread > 0 ? game.team_1 : game.team_2
        return `${selection[0] === 'F' ? favorite : underdog} to ${selection[2] === 'W' ? 'win' : 'cover'}`
    }

    let totalPoints = 0
    let totalCorrect = 0
    for (let pick of picks){
        if (pick.winning_pick){
            totalCorrect++
            totalPoints += pick.points
        }
    }

    return (
        <>
            <h1 className="text-center">My Picks</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Selection</th>
                        <th>Points</th>
                        <th>Outcome</th>
                    </tr>
                </thead>
                <tbody>
                    {picks.map(pick => {
                        const game = games.find(g => g.id == pick.game_id)
                        return (
                            <tr key={pick.id}>
                                <td>{game?.team_1} {game!.spread > 0 && '+'}{game?.spread} vs {game?.team_2}</td>
                                <td>{userSelection(pick.selection, game!)}</td>
                                <td>+{pick.points}</td>
                                { game!.team_1_score && game?.team_2_score ? (
                                    <td className={pick.winning_pick ? 'text-success' : 'text-danger'}>{pick.winning_pick ? 'Winner' : 'Loser'}</td>
                                ) : (
                                    <td>{new Date(game!.kickoff_time) < new Date() ? "In Progress" : "Game Not Started"}</td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong></strong></td>
                        <td><strong>{totalPoints}</strong></td>
                        <td><strong>{totalCorrect}</strong></td>
                    </tr>
                </tfoot>
            </Table>
        </>
    )
}