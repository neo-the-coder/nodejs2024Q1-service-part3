import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './domains/user/user.module';
import { TrackModule } from './domains/track/track.module';
import { ArtistModule } from './domains/artist/artist.module';
import { AlbumModule } from './domains/album/album.module';
import { FavoriteModule } from './domains/favs/favs.module';
import { User } from './domains/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: cfg.get('PG_HOST'),
        port: Number(cfg.get('PG_PORT')),
        username: cfg.get('PG_USER'),
        password: cfg.get('PG_PSW'),
        database: cfg.get('PG_DB'),
        entities: [User],
        // migrations: [],
        // migrationsRun: true,
        // synchronize: true,
      }),
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
  ],
})
export class AppModule {}
