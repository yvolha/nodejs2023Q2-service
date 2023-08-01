import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';
import { ITrack } from 'src/track/track.interface';
import { IUser } from 'src/user/user.interface';

export interface IDatabase {
  users: IUser[];
  albums: IAlbum[];
  artists: IArtist[];
  tracks: ITrack[];
  favs: {
    artists: string[];
    albums: string[];
    tracks: string[];
  };
}

export const database: IDatabase = {
  users: [],
  albums: [],
  artists: [],
  tracks: [],
  favs: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
