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
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track } from 'src/types/types';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getTrackById(@Param('id') id: string): Track {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrackInfo(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.trackService.updateTrackInfo(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    return this.trackService.deleteTrack(id);
  }
}
