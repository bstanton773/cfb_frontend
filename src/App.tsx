import Container from "react-bootstrap/Container";
import Navigation from "./components/Navigation";
import GameBoard from "./views/GameBoard";


export default function App() {
    return <>
    <Navigation />
    <Container>
        <GameBoard />
    </Container>
    </>
}
