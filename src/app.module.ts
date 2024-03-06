import { Module } from '@nestjs/common';
import { UserModule } from './domains/user/user.module';
import { TrackModule } from './domains/track/track.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
