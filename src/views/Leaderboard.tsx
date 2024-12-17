import { useEffect, useState } from "react"
import { LeaderboardUserType } from "../types"
import { getLeaderboard } from "../lib/apiWrapper"
import Table from 'react-bootstrap/Table'

type Props = {};
export default function Leaderboard({}: Props) {
    const [userScores, setUserScores] = useState<LeaderboardUserType[]>([])
    useEffect( () => {
        async function fetchData(){
            const response = await getLeaderboard();
            if (response.data){
                let userScores = response.data;
                setUserScores(userScores.sort((a, b) => b.total_points - a.total_points))
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <h1 className="text-center">Leaderboard</h1>
            <Table striped className="w-100">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Correct</th>
                        <th scope="col">Total Points</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    { userScores.map(u => (
                        <tr key={u.id}>
                            <th scope="row">{u.id}</th>
                            <td>{u.first_name} {u.last_name}</td>
                            <td>{u.total_correct}</td>
                            <td>{u.total_points}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
