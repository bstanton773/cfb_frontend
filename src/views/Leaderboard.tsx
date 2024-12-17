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
                let sortedScores = userScores.sort((a, b) => b.total_points - a.total_points)
                let currentPlace = 1; // Start at 1st place
                let prevPoints: number | null = null; // Track previous user's total points

                const dataWithPlaces = sortedScores.map((user, index) => {
                    // If total_points are different, update the place
                    if (user.total_points !== prevPoints) {
                        currentPlace = index + 1; // New place based on array position
                    }
                    prevPoints = user.total_points; // Update the previous points for next comparison
                    return {
                        ...user,
                        place: currentPlace,
                    };
                });

                setUserScores(dataWithPlaces)
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
                            <th scope="row">{u.place}</th>
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
