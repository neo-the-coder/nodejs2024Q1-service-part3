import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';
import { ModifyFavoritesDto } from './favs.dto';
import { FavoritesResponse } from './favs.interface';
import { myDB } from 'src/main';

@Injectable()
export class FavoriteService {
  // Replace with a database on the next weeks
  private favorites: FavoritesResponse = myDB.favs;

  getAllFavorites(): FavoritesResponse {
    return this.favorites;
  }

  addToFavorites(entityType: string, { id }: ModifyFavoritesDto): string {
    const entityList = myDB[entityType];
    const favoriteList = this.favorites[entityType];

    // status code 400
    if (!entityList) {
      throw new BadRequestException('Invalid entity type');
    }

    const entity = entityList.find((item) => item.id === id);

    // status code 422
    if (!entity) {
      throw new UnprocessableEntityException(
        `${entityType.toUpperCase()} not found`,
      );
    }

    // status code 409 (Entity already in favorites)
    if (favoriteList.some((item) => item.id === entity.id)) {
      throw new ConflictException(
        `${entityType
          .toUpperCase()
          .slice(0, -1)} with id ${id} is already in favorites.`,
      );
    }

    // status 201
    favoriteList.push(entity);
    return `${entityType
      .toUpperCase()
      .slice(0, -1)} with id ${id} added to favorites.`;
  }

  removeFromFavorites(entityType: string, { id }: ModifyFavoritesDto): void {
    const entityList = this.favorites[entityType];

    // status code 400
    if (!entityList) {
      throw new BadRequestException('Invalid entity type');
    }

    const entityIndex = entityList.findIndex((item) => item.id === id);

    // status code 422
    if (entityIndex === -1) {
      throw new NotFoundException(
        `${entityType.toUpperCase()} is not in the favorites!`,
      );
    }

    // status 204
    this.favorites[entityType].splice(entityIndex, 1);
  }
}
