import { IsNotEmpty, IsUUID } from 'class-validator';

export interface ModifyFavoritesDto {
  id: string; // uuid v4
}

export class ModifyFavoritesDtoClass implements ModifyFavoritesDto {
  @IsNotEmpty()
  @IsUUID('4')
  id: string;
}
