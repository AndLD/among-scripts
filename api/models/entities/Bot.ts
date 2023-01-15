import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity({ name: 'bots' })
export class Bot {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number

    @Column()
    storage: number

    @ManyToOne(() => User, (user) => user.bases)
    user: User
}
