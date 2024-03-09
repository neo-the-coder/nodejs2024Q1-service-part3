import { Module } from '@nestjs/common';
import { FavoriteController } from './favs.controller';
import { FavoriteService } from './favs.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
