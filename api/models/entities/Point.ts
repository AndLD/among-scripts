import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Base } from './Base'
import { Bot } from './Bot'
import { Resource } from './Resource'

@Entity({ name: 'points' })
export class Point {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: string

    @Column()
    x: number

    @Column()
    y: number

    @Column({ name: 'resource_id' })
    resourceId?: number

    @Column({ name: 'base_id' })
    baseId?: number

    @Column({ name: 'bot_id' })
    botId?: number

    @OneToOne(() => Resource)
    resource?: Resource
    @OneToOne(() => Base)
    base?: Base
    @OneToOne(() => Bot)
    bot?: Bot
}
