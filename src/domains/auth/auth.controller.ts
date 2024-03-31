import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoggingService } from 'src/utils/logging/logging.service';
import { CreateUserDtoClass as UserAuthDtoClass } from '../user/user.dto';
import { RefreshTokenDtoClass } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly logging: LoggingService,
  ) {}

  @Post('login')
  //   @Public()
  async login(@Body() signInDto: UserAuthDtoClass) {
    return await this.authService.login(signInDto);
  }

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupDto: UserAuthDtoClass) {
    return await this.authService.signup(signupDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDtoClass) {
    return await this.authService.refresh(refreshTokenDto);
  }
}
