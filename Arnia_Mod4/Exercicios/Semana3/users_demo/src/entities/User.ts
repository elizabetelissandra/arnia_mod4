import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Address } from "./Address";
import { Pet } from "./Pet";
import { Events } from "./Events";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255, select: false})
    password: string;

    @Column({name: 'is_active', default: true})
    isActive: boolean

    @OneToOne(() => Address, address => address.user)
    address: Address

    @OneToMany(() => Pet, (pet) => pet.user)
    pet:Pet[]

    @ManyToMany(() => Events, (event) => event.participants)
    @JoinTable()
    events: Events[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hashSync(this.password, 10);
    }

    
       
}