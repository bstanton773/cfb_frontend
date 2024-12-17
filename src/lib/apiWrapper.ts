import axios from "axios";
import { GameType, UserType, TokenType, LeaderboardUserType, UserFormDataType } from "../types";


const baseURL:string = 'http://127.0.0.1:5000/api/'
const gamesEndpoint:string = 'games'
const userEndpoint:string = 'users'
const leaderboardEndpoint:string = 'leaderboard'
const tokenEndpoint:string = userEndpoint + '/token'


const apiClientNoAuth = () => axios.create(
    {
        baseURL: baseURL
    }
)

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})


type APIResponse<T> = {
    data?: T,
    error?: string
}

async function getGames(): Promise<APIResponse<GameType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(gamesEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username, password).post(tokenEndpoint)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getMe(token:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me')
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getLeaderboard(): Promise<APIResponse<LeaderboardUserType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(leaderboardEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editUserById(token:string, userId:string|number, editedUserData:Partial<UserFormDataType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint + '/' + userId, editedUserData);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { error, data }
}

export {
    getGames,
    getMe,
    login,
    getLeaderboard,
    editUserById,
}