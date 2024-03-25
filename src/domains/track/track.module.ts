import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Album } from '../album/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Album])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
