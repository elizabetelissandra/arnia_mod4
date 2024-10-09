import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Pet{
@PrimaryGeneratedColumn()
id: number

@Column({type: "varchar", length: 120})
name: string

@Column()
age: number

@Column({type: "varchar", length: 120})
breed: string

@ManyToOne(() => User, (user) => user.pet, {nullable: false})
@JoinColumn()
user: User
}