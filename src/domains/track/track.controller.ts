import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Header,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDtoClass, UpdateTrackDtoClass } from './track.dto';
import { Track } from './track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllTracks(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getTrackById(@Param('id') id: string): Promise<Track> {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateTrackDtoClass): Promise<Track> {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrackInfo(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDtoClass,
  ): Promise<Track> {
    return this.trackService.updateTrackInfo(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): Promise<void> {
    return this.trackService.deleteTrack(id);
  }
}
