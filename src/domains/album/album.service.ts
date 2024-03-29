import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { deleteReference } from 'src/utils/deleteReference';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    // status code 200
    return this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<Album> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const album: null | Album = await this.albumRepository.findOneBy({ id });

    // status code 404
    if (!album) {
      throw new NotFoundException('Album does not exist');
    }

    // status code 200
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    // status code 201
    const newAlbum = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(newAlbum);
  }

  async updateAlbumInfo(
    id: string,
    UpdateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const album: null | Album = await this.albumRepository.findOneBy({ id });

    // status code 404
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    // status code 400 (when required fields are missing)
    if (Object.keys(UpdateAlbumDto).length === 0) {
      throw new BadRequestException('Name and year are required');
    }

    // status code 200
    await this.albumRepository.update({ id }, UpdateAlbumDto);
    return await this.albumRepository.findOneBy({ id });
  }

  async deleteAlbum(id: string): Promise<void> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const album: null | Album = await this.albumRepository.findOneBy({ id });

    // status code 404
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    // status code 204
    await this.albumRepository.remove(album);
    // deleteReference('albums', id);
  }
}
