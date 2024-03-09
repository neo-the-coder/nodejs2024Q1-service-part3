import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ModifyFavoritesDto } from './favs.dto';
import { DB } from 'src/db/DB';
import { FavoritesResponse, entityType } from './favs.interface';

@Injectable()
export class FavoriteService {
  // Replace with a database on the next weeks
  private favorites: FavoritesResponse = DB.favs;

  getAllFavorites(): FavoritesResponse {
    return this.favorites;
  }

  addToFavorites(entityType: string, id: ModifyFavoritesDto): string {
    const entityList = DB[entityType];

    // status code 400
    if (!entityList) {
      throw new BadRequestException('Invalid entity type');
    }

    const entity = entityList.find((item) => item.id === id.toString());

    // status code 422
    if (!entity) {
      throw new UnprocessableEntityException(
        `${entityType.toUpperCase()} not found`,
      );
    }

    // status 201
    this.favorites[entityType].push(entity);
    return `${entityType} with ID ${id} added to favorites.`;
  }

  removeFromFavorites(entityType, id: ModifyFavoritesDto): void {
    const entityList = this.favorites[entityType];

    // status code 400
    if (!entityList) {
      throw new BadRequestException('Invalid entity type');
    }

    const entityIndex = entityList.findIndex(
      (item) => item.id === id.toString(),
    );

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
