import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { LoggingModule } from 'src/utils/logging/logging.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AuthService],
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        global: true,
        secret:
          cfg.get('JWT_SEC_KEY') ||
          '521ae6ec1826376dcb6a6e42472bd311ab7014df775713031b10e131478465fb',
        signOptions: { expiresIn: cfg.get('TOKEN_EXPIRED_AT') || '60s' },
      }),
    }),
    LoggingModule,
  ],
})
export class AuthModule {}
