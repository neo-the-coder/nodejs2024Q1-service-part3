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

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
    private readonly logging: LoggingService,
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
        id: existingUser.id,
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
          secret: process.env.JWT_SECRET_KEY,
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
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_EXPIRED_AT,
        secret: process.env.JWT_SECRET_KEY,
      }),
    };
  }
}
