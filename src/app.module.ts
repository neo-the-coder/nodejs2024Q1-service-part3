import { Module } from '@nestjs/common';
import { UserModule } from './domains/user/user.module';
import { TrackModule } from './domains/track/track.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './domains/artist/artist.module';
import { AlbumModule } from './domains/album/album.module';
import { FavoriteModule } from './domains/favs/favs.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
