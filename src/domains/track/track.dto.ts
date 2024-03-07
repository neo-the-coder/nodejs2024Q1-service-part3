import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface CreateTrackDto {
  name: string;
  duration: number; // integer number
}

export interface UpdateTrackDto {
  name?: string;
  duration?: number; // integer number
}

export class CreateTrackDtoClass implements CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}

export class UpdateTrackDtoClass implements UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  duration?: number;
}
