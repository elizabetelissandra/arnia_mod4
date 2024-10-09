import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Events{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    eventName: string

    @Column()
    eventDate: Date

    @ManyToMany(() => User, (user) => user.events)
    participants: User[]

}