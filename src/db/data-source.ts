import 'reflect-metadata';
import { Album } from 'src/domains/album/album.entity';
import { Artist } from 'src/domains/artist/artist.entity';
import { Track } from 'src/domains/track/track.entity';
import { User } from 'src/domains/user/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Artist, Album, Track],
  //   migrations: [],
  synchronize: true,
});

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
