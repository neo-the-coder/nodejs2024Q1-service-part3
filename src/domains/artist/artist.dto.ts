import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

export interface UpdateArtistDto {
  name?: string;
  grammy?: boolean;
}

export class CreateArtistDtoClass implements CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDtoClass implements UpdateArtistDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
