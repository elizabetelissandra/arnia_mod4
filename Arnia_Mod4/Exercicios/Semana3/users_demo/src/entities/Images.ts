import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Events } from './Events';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  imageLink: string;

  @ManyToOne(() => Events, (event) => event.image)
  event: Events;
}
