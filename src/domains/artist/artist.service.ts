import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { IArtist } from './artist.interface';
import { deleteReference } from 'src/utils/deleteReference';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    // status code 200
    return this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<Artist> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const artist: null | Artist = await this.artistRepository.findOneBy({ id });

    // status code 404
    if (!artist) {
      throw new NotFoundException('Artist does not exist');
    }

    // status code 200
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    // status code 201
    const newArtist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async updateArtistInfo(
    id: string,
    UpdateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const artist: null | Artist = await this.artistRepository.findOneBy({ id });

    // status code 404
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    // status code 400 (when required fields are missing)
    if (Object.keys(UpdateArtistDto).length === 0) {
      throw new BadRequestException('Name and grammy are required');
    }

    // status code 200
    await this.artistRepository.update({ id }, UpdateArtistDto);
    return await this.artistRepository.findOneBy({ id });
  }

  async deleteArtist(id: string): Promise<void> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const artist: null | Artist = await this.artistRepository.findOneBy({ id });

    // status code 404
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    // status code 204
    await this.artistRepository.remove(artist);
    deleteReference('artists', id);
  }
}
