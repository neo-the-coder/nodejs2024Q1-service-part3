import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { DB } from 'src/db/DB';
import { Artist } from './artist.interface';

@Injectable()
export class ArtistService {
  // Replace with a database on the next weeks
  private artists: Artist[] = DB.artists;

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const artist = this.artists.find((a) => a.id === id);

    // status code 404
    if (!artist) {
      throw new NotFoundException('Artist does not exist');
    }

    // status code 200
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const { name, grammy } = createArtistDto;

    // // status code 400
    // if (!name || !grammy) {
    //   throw new BadRequestException('Name and grammy are required');
    // }

    const existingArtist = this.artists.find((a) => a.name === name);

    // status code 409 (Artist name already in DB)
    if (existingArtist) {
      throw new ConflictException('Artist with such name already exists');
    }

    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    this.artists.push(newArtist);

    // status code 201
    return newArtist;
  }

  updateArtistInfo(id: string, UpdateArtistDto: UpdateArtistDto): Artist {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const artistIndex = this.artists.findIndex((a) => a.id === id);

    // status code 404
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }

    const { name, grammy } = UpdateArtistDto;

    // status code 400 (when required fields are missing)
    if (!name && grammy === undefined) {
      throw new BadRequestException('Name and grammy are required');
    }

    const artist = this.artists[artistIndex];

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;
    this.artists[artistIndex] = artist;

    // status code 200
    return artist;
  }

  deleteArtist(id: string): void {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const artistIndex = this.artists.findIndex((a) => a.id === id);

    // status code 404
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.artists.splice(artistIndex, 1);
    // if no error thrown, code reached here and status code 204
  }
}
