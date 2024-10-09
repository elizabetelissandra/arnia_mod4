import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})  
  street: string;

  @Column({type: 'varchar', length: 64})  
  city: string;

  @Column({type: 'varchar', length: 32})  
  zipCode: string;

  @OneToOne(() => User, user => user.address, {nullable: false})
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deleteAt: Date
}
