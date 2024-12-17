
export type UserType = {
    id:number,
    first_name:string,
    last_name:string,
    username:string,
    email:string,
    date_created:string
}

export type LeaderboardUserType = UserType & {
    total_correct:number,
    total_points:number
}

export type GameType = {
    id: number,
    bowl_name: string,
    team_1: string,
    team_2: string,
    kickoff_time: Date,
    spread: number
}

export type UserFormDataType = {
    first_name:string,
    last_name:string,
    email:string,
    username:string,
    password:string,
    confirm_password:string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    token_expiration:string
}
