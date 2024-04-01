import { Body, Controller, HttpCode, Post, SetMetadata } from '@nestjs/common';
import { CreateUserDtoClass as UserAuthDtoClass } from '../user/user.dto';
import { RefreshTokenDtoClass } from './auth.dto';
import { AuthService } from './auth.service';

const PublicRoute = () => SetMetadata('isPublicRoute', true);

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @PublicRoute()
  @HttpCode(201)
  async signup(@Body() signupDto: UserAuthDtoClass) {
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  @PublicRoute()
  async login(@Body() signInDto: UserAuthDtoClass) {
    return await this.authService.login(signInDto);
  }

  @Post('refresh')
  @PublicRoute()
  async refresh(@Body() refreshTokenDto: RefreshTokenDtoClass) {
    return await this.authService.refresh(refreshTokenDto);
  }
}
