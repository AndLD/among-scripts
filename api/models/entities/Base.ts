import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IBase } from '../../utils/interfaces/base'
import { User } from './User'

@Entity({ name: 'bases' })
export class Base implements IBase {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number

    @Column()
    storage: number

    @ManyToOne(() => User, (user) => user.bases)
    user: User
}
