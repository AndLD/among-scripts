import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'resources' })
export class Resource {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number
}
