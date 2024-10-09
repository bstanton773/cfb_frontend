import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation";
import GameBoard from "./views/GameBoard";
import Leaderboard from "./views/Leaderboard";


export default function App() {
    return <>
    <Navigation />
    <Container>
        <GameBoard />
        <Leaderboard />
    </Container>
    </>
}
