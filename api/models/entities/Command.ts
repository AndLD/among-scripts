import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommandStatus, CommandType, ICommand } from '../../utils/interfaces/command'
import { User } from './User'

@Entity({ name: 'commands' })
export class Command implements ICommand {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number

    @Column()
    type: CommandType

    @Column()
    status: CommandStatus

    @Column()
    timestamp: string

    @Column({ name: 'last_update_timestamp' })
    lastUpdateTimestamp?: string

    @ManyToOne(() => User, (user) => user.commands)
    user: User
}
