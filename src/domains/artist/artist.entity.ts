import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IArtist } from './artist.interface';

@Entity()
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
