import {
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto as UserAuthDto } from '../user/user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from 'src/utils/logging/logging.service';
import { IJwtPayload } from './auth.interface';
import { RefreshTokenDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
    private readonly logging: LoggingService,
    private configService: ConfigService,
  ) {}

  async login({ login, password }: UserAuthDto) {
    try {
      const existingUser = await this.userService.getUserByLogin(login);

      const isPasswordValid = await compare(password, existingUser.password);

      // status code 403
      if (!isPasswordValid) {
        throw new ForbiddenException('Incorrect password');
      }

      const payload: IJwtPayload = {
        userId: existingUser.id,
        login: existingUser.login,
      };

      return await this.genTokens(payload);
    } catch (error) {
      this.logging.error(error.message);
      throw error;
    }
  }

  async signup(createUserDto: UserAuthDto) {
    try {
      return this.userService.createUser(createUserDto);
    } catch (error) {
      this.logging.error(error.message);
      throw error;
    }
  }

  async refresh({ refreshToken }: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync<IJwtPayload>(
        refreshToken,
        {
          secret: process.env.JWT_SEC_REF_KEY,
        },
      );
      return await this.genTokens(payload);
    } catch (error) {
      this.logging.error(error.message);
      throw error;
    }
  }

  private async genTokens(payload: IJwtPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('TOKEN_EXPIRED_AT') || '60s',
        secret:
          this.configService.get('JWT_SECRET_KEY') ||
          '521ae6ec1826376dcb6a6e42472bd311ab7014df775713031b10e131478465fb',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('TOKEN_REF_EXPIRED_AT') || '120s',
        secret:
          this.configService.get('JWT_SEC_REF_KEY') ||
          '5b863ebec314a2f6feb36426bece858bea531759994ac7ac005a3e2e7f2e04d0',
      }),
    };
  }
}
