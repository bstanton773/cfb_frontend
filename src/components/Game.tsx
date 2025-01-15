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

    const formatDateToLocal = (gmtDate: string): string => {
            const date = new Date(gmtDate);

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                return "Invalid date";
            }

            // Format the date in local time
            const formatter = new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });

            return formatter.format(date);
    };

    const getPickPoints = (selection: string, game: GameType) => {
        let val = 0
        if (selection === "FTW"){
            val = 1
        } else if (selection === "UTW"){
            val = 3
        } else {
            val = 2
        }
        if (game.is_playoff) {
            val *=2
        } else if (game.is_championship){
            val *= 3
        }
        return val
    }

    return (
        <Card className="my-3">
            <Card.Header>
                {(game.is_playoff || game.is_championship) && <i className={`bi bi-star-fill ${game.is_championship && 'text-primary'}`}></i>}
                {game.bowl_name}
                {(game.is_playoff || game.is_championship) && <i className={`bi bi-star-fill ${game.is_championship && 'text-primary'}`}></i>}
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    {game.team_1} {game.spread < 0 || '+'}{game.spread}
                    <i className={new Date(game.kickoff_time).getTime() - new Date().getTime() > 2 * 60 * 60 * 1000 ? "bi bi-unlock": "bi bi-lock"}></i>
                    vs. {game.team_2}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{formatDateToLocal(game.kickoff_time)}</Card.Subtitle>
                <Form onSubmit={handleSubmit}>
                    <Form.Select onChange={handlePickChange} value={selectedPick}>
                        <option value=''>Your Pick</option>
                        <option value={game.spread > 0 ? 'UTW' : 'FTW'}>{game.team_1} Money Line (+{getPickPoints(game.spread > 0 ? 'UTW' : 'FTW', game)})</option>
                        <option value={game.spread > 0 ? 'UTC' : 'FTC'}>{game.team_1} Spread (+{getPickPoints(game.spread > 0 ? 'UTC' : 'FTC', game)})</option>)
                        <option value={game.spread > 0 ? 'FTC' : 'UTC'}>{game.team_2} Spread (+{getPickPoints(game.spread > 0 ? 'FTC' : 'UTC', game)})</option>
                        <option value={game.spread > 0 ? 'FTW' : 'UTW'}>{game.team_2} Money Line (+{getPickPoints(game.spread > 0 ? 'FTW' : 'UTW', game)})</option>
                    </Form.Select>
                    <Button variant={existingPick ? "success": "primary"} type="submit" className="mt-3" disabled={!selectedPick} >
                        {existingPick ? "Update Pick" : "Submit Pick"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
