import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';
import { database } from 'src/database/database';
import { ITrack } from 'src/track/track.interface';

export class CommonService {

  async getAll(field: string): Promise<Array<IArtist | IAlbum | ITrack>> {
    return await database[field];
  }

  async getOne(id: string, field: string): Promise<IArtist | IAlbum | ITrack> {
    return await database[field].find(
      (item: IArtist | IAlbum | ITrack) => item.id === id,
    );
  }

  async delete(id: string, field: string) {
    database[field] = database[field].filter(
      (item: IArtist | IAlbum | ITrack) => item.id !== id,
    );
    return;
  }

}
