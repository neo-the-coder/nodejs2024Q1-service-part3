import { Album } from '../album/album.interface';
import { Artist } from '../artist/artist.interface';
import { Track } from '../track/track.interface';

// export interface Favorites {
//   artists: string[]; // favorite artists ids
//   albums: string[]; // favorite albums ids
//   tracks: string[]; // favorite tracks ids
// }

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export type entityType = 'tracks' | 'artists' | 'albums';
