import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IUser, UserStatus } from '../../utils/interfaces/user'
import { Base } from './Base'
import { Bot } from './Bot'
import { Command } from './Command'

@Entity({ name: 'users' })
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    status: UserStatus

    @Column()
    active: boolean

    @Column()
    timestamp: string

    @Column({ name: 'last_update_timestamp' })
    lastUpdateTimestamp?: string

    @OneToMany(() => Base, (base) => base.userId)
    bases: Base[]

    @OneToMany(() => Bot, (bot) => bot.userId)
    bots: Bot[]

    @OneToMany(() => Command, (command) => command.userId)
    commands: Command[]
}
