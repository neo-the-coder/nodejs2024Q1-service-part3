import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Header,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favs.service';
import { ModifyFavoritesDtoClass } from './favs.dto';
import { FavoritesResponse } from './favs.interface';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllFavorites(): FavoritesResponse {
    return this.favoriteService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  addToFavoritesTrack(@Param('id') id: ModifyFavoritesDtoClass) {
    return this.favoriteService.addToFavorites('tracks', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeFromFavoritesTrack(@Param('id') id: ModifyFavoritesDtoClass): void {
    return this.favoriteService.removeFromFavorites('tracks', id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addToFavoritesAlbum(@Param('id') id: ModifyFavoritesDtoClass) {
    return this.favoriteService.addToFavorites('albums', id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeFromFavoritesAlbum(@Param('id') id: ModifyFavoritesDtoClass): void {
    return this.favoriteService.removeFromFavorites('albums', id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addToFavoritesArtist(@Param('id') id: ModifyFavoritesDtoClass) {
    return this.favoriteService.addToFavorites('artists', id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeFromFavoritesArtist(@Param('id') id: ModifyFavoritesDtoClass): void {
    return this.favoriteService.removeFromFavorites('artists', id);
  }
}
