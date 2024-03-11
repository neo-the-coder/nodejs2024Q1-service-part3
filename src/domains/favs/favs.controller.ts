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
  addToFavoritesTrack(@Param() params: ModifyFavoritesDtoClass) {
    return this.favoriteService.addToFavorites('tracks', params);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeFromFavoritesTrack(@Param() params: ModifyFavoritesDtoClass): void {
    return this.favoriteService.removeFromFavorites('tracks', params);
  }

  @Post('album/:id')
  @HttpCode(201)
  addToFavoritesAlbum(@Param() params: ModifyFavoritesDtoClass) {
    return this.favoriteService.addToFavorites('albums', params);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeFromFavoritesAlbum(@Param() params: ModifyFavoritesDtoClass): void {
    return this.favoriteService.removeFromFavorites('albums', params);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addToFavoritesArtist(@Param() params: ModifyFavoritesDtoClass) {
    return this.favoriteService.addToFavorites('artists', params);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeFromFavoritesArtist(@Param() params: ModifyFavoritesDtoClass): void {
    return this.favoriteService.removeFromFavorites('artists', params);
  }
}
