import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { LoggingModule } from 'src/utils/logging/logging.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  //   useClass: AuthGuard
  imports: [
    UserModule,
    JwtModule.register({
      //   global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRED_AT },
    }),
    LoggingModule,
  ],
})
export class AuthModule {}
