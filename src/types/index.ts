
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
    total_points:number,
    place:number
}

export type GameType = {
    id: number,
    bowl_name: string,
    team_1: string,
    team_2: string,
    kickoff_time: Date,
    spread: number,
    team_1_score: number,
    team_2_score: number,
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

export type PickType = {
    game_id: number;
    id: number;
    points: number;
    selection: string;
    updated_at: string;
    user_id: number;
    winning_pick: boolean;
};
