import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './domains/user/user.module';
import { TrackModule } from './domains/track/track.module';
import { ArtistModule } from './domains/artist/artist.module';
import { AlbumModule } from './domains/album/album.module';
import { FavoriteModule } from './domains/favs/favs.module';
import { User } from './domains/user/user.entity';
import { Artist } from './domains/artist/artist.entity';
import { Album } from './domains/album/album.entity';
import { Track } from './domains/track/track.entity';
import { LoggingMiddleware } from './utils/logging/logging.middleware';
import { LoggingModule } from './utils/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: cfg.get('POSTGRES_HOST'),
        port: Number(cfg.get('POSTGRES_PORT')),
        username: cfg.get('POSTGRES_USER'),
        password: cfg.get('POSTGRES_PASSWORD'),
        database: cfg.get('POSTGRES_DB'),
        entities: [User, Artist, Album, Track],
        // migrations: [],
        // migrationsRun: true,
        synchronize: true,
      }),
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    LoggingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
