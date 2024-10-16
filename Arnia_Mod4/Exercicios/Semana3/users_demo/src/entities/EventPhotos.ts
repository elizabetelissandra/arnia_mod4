import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "./Events";

@Entity('event-photos')
export class EventPhotos{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 264})
    url: string

    @ManyToOne(() => Events, (event) => event.photo, {onDelete: 'CASCADE'})
    event: Events
}