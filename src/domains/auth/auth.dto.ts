import { IsString, IsNotEmpty } from 'class-validator';

export interface RefreshTokenDto {
  refreshToken: string;
}

export class RefreshTokenDtoClass implements RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
