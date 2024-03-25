import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAlbum } from './album.interface';
import { Artist } from '../artist/artist.entity';

@Entity()
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;
}
