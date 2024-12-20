import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
// import Button from 'react-bootstrap/Button';

type NavigationProps = {
    isLoggedIn: boolean,
    logUserOut: () => void,
}

export default function Navigation({ isLoggedIn, logUserOut }: NavigationProps) {
    return (
        <Navbar expand='lg' data-bs-theme='dark' bg='dark'>
            <Container fluid>
                <Navbar.Brand>College Football Bowl Mania</Navbar.Brand>
                { isLoggedIn && (
                    <>
                        <Navbar.Toggle aria-controls='nav-collapse' />
                        <Navbar.Collapse id="nav-collapse">
                            <Nav className='me-auto'>
                                <Nav.Link as={Link} to='/'>Leaderboard</Nav.Link>
                                <Nav.Link as={Link} to='/games'>Game Board</Nav.Link>
                                <Nav.Link as={Link} to='/picks'>Game Picks</Nav.Link>
                                <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                                <Nav.Link as={Link} to='/login' onClick={logUserOut}>Log Out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )}
            </Container>
        </Navbar>
    )
}