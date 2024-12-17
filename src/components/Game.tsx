import { useState, useEffect } from "react"
import { CategoryType, GameType, PickType } from "../types"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { createPick, updatePick } from "../lib/apiWrapper"

type GameProps = {
    game: GameType;
    myPicks: PickType[];
    flashMessage: (message:string, category:CategoryType) => void;
    updateMyPicks: () => void;
}

export default function Game({ game, myPicks, flashMessage, updateMyPicks }: GameProps) {
    // Check if a pick already exists for the current game
    const existingPick = myPicks.find((pick) => pick.game_id === game.id);
    const [selectedPick, setSelectedPick] = useState<string>('');

    useEffect(() => {
        if (existingPick) {
            setSelectedPick(existingPick.selection);
        }
    }, [existingPick]);

    // Handle dropdown change
    const handlePickChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPick(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPick) {
            console.warn("No selection made.");
            return;
        }

        const token = localStorage.getItem('token') || '';
        let response;
        if (existingPick) {
            response = await updatePick(token, {game_id: game.id, selection: selectedPick});
        } else {
            response = await createPick(token, {game_id: game.id, selection: selectedPick});
        }
        if (response?.error){
            flashMessage(response.error, 'danger')
        } else {
            updateMyPicks()
        }

        // Clear the selection after submission
        setSelectedPick('');
    };

    return (
        <Card className="my-3">
            <Card.Header>{game.bowl_name}</Card.Header>
            <Card.Body>
                <Card.Title>
                    {game.team_1} {game.spread < 0 || '+'}{game.spread}
                    <i className={new Date(game.kickoff_time).getTime() - new Date().getTime() > 2 * 60 * 60 * 1000 ? "bi bi-unlock": "bi bi-lock"}></i>
                    vs. {game.team_2}</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Select onChange={handlePickChange} value={selectedPick}>
                        <option value=''>Your Pick</option>
                        <option value={game.spread > 0 ? 'UTW' : 'FTW'}>{game.team_1} Money Line</option>
                        <option value={game.spread > 0 ? 'UTC' : 'FTW'}>{game.team_1} Spread</option>
                        <option value={game.spread > 0 ? 'FTC' : 'UTC'}>{game.team_2} Spread</option>
                        <option value={game.spread > 0 ? 'FTW' : 'UTW'}>{game.team_2} Money Line</option>
                    </Form.Select>
                    <Button variant={existingPick ? "success": "primary"} type="submit" className="mt-3" disabled={!selectedPick} >
                        {existingPick ? "Update Pick" : "Submit Pick"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}