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
import { ArtistService } from './artist.service';
import { CreateArtistDtoClass, UpdateArtistDtoClass } from './artist.dto';
import { Artist } from './artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getArtistById(@Param('id') id: string): Artist {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() createArtistDto: CreateArtistDtoClass): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  updateArtistInfo(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDtoClass,
  ): Artist {
    return this.artistService.updateArtistInfo(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): void {
    return this.artistService.deleteArtist(id);
  }
}
