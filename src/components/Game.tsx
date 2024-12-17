import { GameType } from "../types"
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

type GameProps = {
    game: GameType
}

export default function Game({ game }: GameProps) {
    return (
        <Card>
            <Card.Header>Game #{game.id}</Card.Header>
            <Card.Body>
                <Card.Title>{game.team_1} {game.spread < 0 || '+'}{game.spread}<i className={game.id % 2 ? "bi bi-unlock" : "bi bi-lock"}></i> vs. {game.team_2}</Card.Title>
                <Form.Select>
                    <option>Your Pick</option>
                    <option value='1'>{game.team_1} Money Line</option>
                    <option value='2'>{game.team_1} Spread</option>
                    <option value='3'>{game.team_2} Spread</option>
                    <option value='4'>{game.team_2} Money Line</option>
                </Form.Select>
            </Card.Body>
        </Card>
    )
}