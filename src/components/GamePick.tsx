import { GamePickType } from "../types";
import Accordion from 'react-bootstrap/Accordion'
import Table from "react-bootstrap/Table";


type GamePickProps = {
    game: GamePickType
}

export default function GamePick({ game }: GamePickProps) {

    const userSelection = (selection: string, game: GamePickType) => {
        let favorite = game.spread < 0 ? game.team_1 : game.team_2
        let underdog = game.spread > 0 ? game.team_1 : game.team_2
        return `${selection[0] === 'F' ? favorite : underdog} to ${selection[2] === 'W' ? 'win' : 'cover'}`
    }

    return (
        <Accordion>
            <Accordion.Item eventKey={String(game.id)}>
                <Accordion.Header>
                    {game.bowl_name} - {game.team_1} {game.team_1_score && `(${game.team_1_score})`} vs. {game.team_2_score && `(${game.team_2_score})`} {game.team_2}</Accordion.Header>
                <Accordion.Body>
                    <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Selection</th>
                            <th>Points</th>
                            <th>Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {game.picks.map(pick => (
                            <tr key={pick.id}>
                                <td>{pick.user.first_name} {pick.user.last_name}</td>
                                <td>{userSelection(pick.selection, game)}</td>
                                <td>{pick.points}</td>
                                { game!.team_1_score && game?.team_2_score ? (
                                    <td className={pick.winning_pick ? 'text-success' : 'text-danger'}>{pick.winning_pick ? 'Winner' : 'Loser'}</td>
                                ) : (
                                    <td>{new Date(game!.kickoff_time) < new Date() ? "In Progress" : "Game Not Started"}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}