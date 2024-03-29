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
import { AlbumService } from './album.service';
import { CreateAlbumDtoClass, UpdateAlbumDtoClass } from './album.dto';
import { Album } from './album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  // Prevent Status 304 after 200
  @Header('ETag', ' ')
  getAlbumById(@Param('id') id: string): Promise<Album> {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() createAlbumDto: CreateAlbumDtoClass): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbumInfo(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDtoClass,
  ): Promise<Album> {
    return this.albumService.updateAlbumInfo(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}
