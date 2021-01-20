export interface IUser {
    access_token?: string;
    athlete?: IAthlete;
    refresh_token?: string;
}

export interface IAthlete {
    city: string;
    country: string;
    firstname: string;
    lastname: string;
    state: string;
}