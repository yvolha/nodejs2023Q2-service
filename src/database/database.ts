import { IAlbum } from "src/album/album.interface";
import { IArtist } from "src/artist/artist.interface";
import { ITrack } from "src/track/track.interface";
import { IUser } from "src/user/user.interface";

interface IDatabase {
  users: IUser[],
  albums: IAlbum[],
  artists: IArtist[],
  tracks: ITrack[],
  favs: {
    artists: IArtist[],
    albums: IAlbum[],
    tracks: ITrack[],
  }
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