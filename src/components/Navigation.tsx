import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';

type NavigationProps = {}

export default function Navigation({}: NavigationProps) {
    return (
        <Navbar expand='lg' data-bs-theme='dark' bg='dark'>
            <Container fluid>
                <Navbar.Brand>College Football Bowl Mania</Navbar.Brand>
            </Container>
        </Navbar>
    )
}