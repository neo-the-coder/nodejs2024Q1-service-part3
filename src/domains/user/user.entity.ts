import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { IUser } from './user.interface';
import { Exclude } from 'class-transformer';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn({ type: 'int' })
  version: number;

  @Column({ type: 'int8' })
  createdAt: number;

  @Column({ type: 'int8' })
  updatedAt: number;
}
