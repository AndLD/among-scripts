export interface ICommand {
    id: number
    userId: number
    type: CommandType
    status: CommandStatus
    timestamp: number
    lastUpdateTimestamp?: number
}

export enum BaseCommands {
    BUILD_BOT
}
export enum BotCommands {
    MOVE,
    SCAN,
    MINE,
    GIVE_RES,
    SCRIPT
}

export type CommandType = BaseCommands | BotCommands

export enum CommandStatus {
    CREATED = 'created',
    IN_PROCESS = 'in_process',
    COMPLETED = 'completed'
}
