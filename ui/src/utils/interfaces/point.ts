export interface IPoint {
    x: number
    y: number
    type: ObjectType | null
    objectId: number | null
}

export enum ObjectType {
    RESOURCE,
    BASE,
    BOT
}
