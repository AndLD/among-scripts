export interface IPoint {
    id: number
    userId?: number
    x: number
    y: number
    resourceId?: number
    botId?: number
    baseId?: number
}

export enum ObjectType {
    RESOURCE,
    BASE,
    BOT
}
