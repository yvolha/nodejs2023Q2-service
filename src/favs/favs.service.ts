import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';
import { database } from 'src/database/database';
import { ITrack } from 'src/track/track.interface';

@Injectable()
export class FavsService {
  getFavs() {
    return {
      artists: database.artists.filter((item) =>
        database.favs.artists.includes(item.id),
      ),
      albums: database.albums.filter((item) =>
        database.favs.albums.includes(item.id),
      ),
      tracks: database.tracks.filter((item) =>
        database.favs.tracks.includes(item.id),
      ),
    };
  }

  async addToFavs(id: string, field: string) {
    const item = database[field].find(
      (el: IArtist | IAlbum | ITrack) => el.id === id,
    );

    if (!item) return;

    database.favs[field] = [...database.favs[field], item.id];

    return item;
  }

  async deleteFromFavs(id: string, field: string) {
    const item = database[field].find(
      (el: IArtist | IAlbum | ITrack) => el.id === id,
    );

    if (!item) return;

    database.favs[field] = database.favs[field].filter((_) => _ !== id);

    return item;
  }
}
