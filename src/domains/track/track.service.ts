import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { deleteReference } from 'src/utils/deleteReference';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../album/album.entity';
import { Repository } from 'typeorm';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Album)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<Track> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const track: null | Track = await this.trackRepository.findOneBy({ id });

    // status code 404
    if (!track) {
      throw new NotFoundException('Track does not exist');
    }

    // status code 200
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    // status code 201
    const newTrack = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(newTrack);
  }

  async updateTrackInfo(
    id: string,
    UpdateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const track: null | Track = await this.trackRepository.findOneBy({ id });

    // status code 404
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    // status code 400 (when required fields are missing)
    if (Object.keys(UpdateTrackDto).length === 0) {
      throw new BadRequestException('Name and duration are required');
    }

    // status code 200
    await this.trackRepository.update({ id }, UpdateTrackDto);
    return await this.trackRepository.findOneBy({ id });
  }

  async deleteTrack(id: string): Promise<void> {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const track: null | Track = await this.trackRepository.findOneBy({ id });

    // status code 404
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    // status code 204
    await this.trackRepository.remove(track);
    // deleteReference('tracks', id);
  }
}
