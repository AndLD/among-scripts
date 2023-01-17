export interface IUser {
    id: number
    username: string
    email: string
    password: string
    status: UserStatus
    active: boolean
    timestamp: string
    lastUpdateTimestamp?: string
}

export interface IUserInfo {
    id: number
    username: string
    email: string
    status: UserStatus
    active: boolean
    timestamp: string
    lastUpdateTimestamp?: string
}

export interface IUserState {
    id: number
    username: string
    email: string
    status: UserStatus
    active: boolean
    timestamp: string
    lastUpdateTimestamp?: string
}

export interface IUserPost {
    username: string
    email: string
    password: string
    status: UserStatus
    active: boolean
}

export interface IUserPostBody {
    username: string
    email: string
    password: string
}

export interface IFetchUsersResponse {
    result: IUserInfo[]
}

export interface IUserPostResponse {
    result: string
}

export interface IUserPutBody {
    status: UserStatus
}

export interface IUserPutResponse {
    result: IUserInfo
}

export enum UserStatus {
    ADMIN = 'admin',
    PLAYER = 'player',
    BANNED = 'banned'
}
