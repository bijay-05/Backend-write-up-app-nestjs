export interface IAuthToken {
    accesstoken: string;
    refreshtoken: string;
}

export interface IAuthUser {
    sub: string;
    sessionId: string;
}