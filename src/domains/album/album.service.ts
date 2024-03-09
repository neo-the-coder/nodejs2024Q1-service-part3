import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { DB } from 'src/db/DB';
import { Album } from './album.interface';

@Injectable()
export class AlbumService {
  // Replace with a database on the next weeks
  private albums: Album[] = DB.albums;

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const album = this.albums.find((a) => a.id === id);

    // status code 404
    if (!album) {
      throw new NotFoundException('Album does not exist');
    }

    // status code 200
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const { name, year } = createAlbumDto;

    // // status code 400
    // if (!name || !year) {
    //   throw new BadRequestException('Name and year are required');
    // }

    const existingAlbum = this.albums.find((a) => a.name === name);

    // status code 409 (Album name already in DB)
    if (existingAlbum) {
      throw new ConflictException('Album with such name already exists');
    }

    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId: null,
    };
    this.albums.push(newAlbum);

    // status code 201
    return newAlbum;
  }

  updateAlbumInfo(id: string, UpdateAlbumDto: UpdateAlbumDto): Album {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const albumIndex = this.albums.findIndex((a) => a.id === id);

    // status code 404
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    const { name, year } = UpdateAlbumDto;

    // status code 400 (when required fields are missing)
    if (!name && !year) {
      throw new BadRequestException('Name and year are required');
    }

    const album = this.albums[albumIndex];

    album.name = name ?? album.name;
    album.year = year ?? album.year;
    this.albums[albumIndex] = album;

    // status code 200
    return album;
  }

  deleteAlbum(id: string): void {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const albumIndex = this.albums.findIndex((a) => a.id === id);

    // status code 404
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    this.albums.splice(albumIndex, 1);
    // if no error thrown, code reached here and status code 204
  }
}
