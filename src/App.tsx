// react imports
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
// view imports 
// import GameBoard from "./views/GameBoard";
import Leaderboard from "./views/Leaderboard";
import Login from './views/Login';
import Profile from './views/Profile';
// component imports
import AlertMessage from "./components/AlertMessage";
import Navigation from "./components/Navigation";
// bootstrap imports 
import Container from "react-bootstrap/Container";
// helper imports
import { getMe } from './lib/apiWrapper';
import { CategoryType, UserType } from './types';
import GameBoard from './views/GameBoard';
import GamePicks from './views/GamePicks';


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')||0) > new Date() ? true : false);
    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null)

    const [message, setMessage] = useState<string|undefined>(undefined)
    const [category, setCategory] = useState<CategoryType|undefined>(undefined)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn){
            navigate('/login')
        }
    }, [isLoggedIn])

    useEffect(() => {
        async function getLoggedInUser(){
            if (isLoggedIn){
                const token = localStorage.getItem('token') || ''
                const response = await getMe(token);
                if (response.data){
                    setLoggedInUser(response.data);
                    localStorage.setItem('currentUser', JSON.stringify(response.data))
                } else {
                    setIsLoggedIn(false);
                    console.error(response.data);
                }
            }
        }
        getLoggedInUser()
    }, [isLoggedIn])

    const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
        setMessage(newMessage);
        setCategory(newCategory);
        // setTimeout(() => {
        //     if (newMessage && newCategory){
        //         flashMessage(undefined, undefined)
        //     }
        // }, 10000)
    }

    const logUserIn = () => {
        setIsLoggedIn(true)
    }

    const logUserOut = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('currentUser');
        flashMessage('You have been logged out', 'dark')
    }

    const updateUser = (updatedUser: UserType) => {
        setLoggedInUser(updatedUser)
    }

    return <>
        <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
        <Container>
            {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                    <Routes>
                        <Route path='/' element={<Leaderboard /> } />
                        <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn} /> } />
                        <Route path='/profile' element={<Profile currentUser={loggedInUser!} flashMessage={flashMessage} updateUser={updateUser}/>} />
                        <Route path='/games' element={<GameBoard flashMessage={flashMessage}/> } />
                        <Route path='/picks' element={<GamePicks /> } />
                    </Routes>
        </Container>
    </>
}


