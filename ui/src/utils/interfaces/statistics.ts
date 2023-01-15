import { UserStatus } from './user'

export interface IStatistics {
    startTimestamp: number
    users: { [key in UserStatus]: number }
    pointsTotal: number
    resourcesTotal: number
    basesTotal: number
    botsTotal: number
    commandsTotal: number
}

export interface IFetchStatisticsResponse {
    result: IStatistics
}
