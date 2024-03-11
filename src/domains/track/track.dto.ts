import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export interface CreateTrackDto {
  name: string;
  duration: number; // integer number
  artistId?: string;
  albumId?: string;
}

export interface UpdateTrackDto {
  name?: string;
  duration?: number; // integer number
  artistId?: string;
  albumId?: string;
}

export class CreateTrackDtoClass implements CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsUUID('4')
  artistId?: string;

  @IsOptional()
  @IsUUID('4')
  albumId?: string;
}

export class UpdateTrackDtoClass implements UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsUUID('4')
  artistId?: string;

  @IsOptional()
  @IsUUID('4')
  albumId?: string;
}
