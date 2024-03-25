import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ITrack } from './track.interface';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

@Entity()
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null;

  @Column()
  duration: number;
}
