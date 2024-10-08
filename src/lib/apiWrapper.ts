import axios from "axios";
import { GameType } from "../types";


const baseURL:string = 'http://127.0.0.1:8000/api/'
const gamesEndpoint:string = 'games/'


const apiClientNoAuth = () => axios.create(
    {
        baseURL: baseURL
    }
)

type APIResponse<T> = {
    data?: T,
    error?: string
}

async function getGames(): Promise<APIResponse<GameType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(gamesEndpoint);
        console.log(response)
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

export {
    getGames,
}