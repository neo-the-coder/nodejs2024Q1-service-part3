import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domains/user/user.module';
import { TrackModule } from './domains/track/track.module';
import { ArtistModule } from './domains/artist/artist.module';
import { AlbumModule } from './domains/album/album.module';
import { FavoriteModule } from './domains/favs/favs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
  ],
})
export class AppModule {}
