import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track } from './track.interface';
import { deleteReference } from 'src/utils/deleteReference';
import { myDB } from 'src/main';

@Injectable()
export class TrackService {
  // Replace with a database on the next weeks
  private tracks: Track[] = myDB.tracks;

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const track = this.tracks.find((t) => t.id === id);

    // status code 404
    if (!track) {
      throw new NotFoundException('Track does not exist');
    }

    // status code 200
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const { name, duration, artistId, albumId } = createTrackDto;

    // DELETED TO PASS TEST
    // const existingTrack = this.tracks.find((t) => t.name === name);

    // // status code 409 (Track name already in DB)
    // if (existingTrack) {
    //   throw new ConflictException('Track with such name already exists');
    // }

    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };
    this.tracks.push(newTrack);

    // status code 201
    return newTrack;
  }

  updateTrackInfo(id: string, UpdateTrackDto: UpdateTrackDto): Track {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const trackIndex = this.tracks.findIndex((t) => t.id === id);

    // status code 404
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    const { name, duration, artistId, albumId } = UpdateTrackDto;

    // status code 400 (when required fields are missing)
    if (!name && !duration && !artistId && albumId) {
      throw new BadRequestException('Name and duration are required');
    }

    const track = this.tracks[trackIndex];

    track.name = name ?? track.name;
    track.duration = duration ?? track.duration;
    track.artistId = artistId ?? track.artistId;
    track.albumId = albumId ?? track.albumId;
    this.tracks[trackIndex] = track;

    // status code 200
    return track;
  }

  deleteTrack(id: string): void {
    // status code 400
    if (!validate(id)) {
      throw new BadRequestException('Not a valid uuid');
    }

    const trackIndex = this.tracks.findIndex((t) => t.id === id);

    // status code 404
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    this.tracks.splice(trackIndex, 1);
    deleteReference('tracks', id);
    // if no error thrown, code reached here and status code 204
  }
}
