import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { EventPhotos } from "./EventPhotos";
import { Images } from "./Images";

@Entity()
export class Events{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    eventName: string

    @Column({type: Date})
    eventDate: Date

    @ManyToMany(() => User, (user) => user.events)
    participants: User[]

    @OneToMany(() => EventPhotos, (eventPhoto) => eventPhoto.event)
    photo: EventPhotos

    @OneToMany(() =>  Images, (image) => image.event)
    image: Images
}