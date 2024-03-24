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
import { Artist } from './artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getArtistById(@Param('id') id: string): Promise<Artist> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() createArtistDto: CreateArtistDtoClass): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  updateArtistInfo(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDtoClass,
  ): Promise<Artist> {
    return this.artistService.updateArtistInfo(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): Promise<void> {
    return this.artistService.deleteArtist(id);
  }
}
