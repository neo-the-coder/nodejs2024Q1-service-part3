import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export interface CreateAlbumDto {
  name: string;
  year: number;
  artistId?: string;
}

export interface UpdateAlbumDto {
  name?: string;
  year?: number;
  artistId?: string;
}

export class CreateAlbumDtoClass implements CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID('4')
  artistId?: string;
}

export class UpdateAlbumDtoClass implements UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsUUID('4')
  artistId?: string;
}
