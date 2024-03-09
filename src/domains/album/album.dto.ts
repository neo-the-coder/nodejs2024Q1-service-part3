import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface CreateAlbumDto {
  name: string;
  year: number;
}

export interface UpdateAlbumDto {
  name?: string;
  year?: number;
}

export class CreateAlbumDtoClass implements CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;
}

export class UpdateAlbumDtoClass implements UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  year?: number;
}
