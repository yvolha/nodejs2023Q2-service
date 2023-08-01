import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { database } from 'src/database/database';
import { CommonService } from 'src/utils/commonService';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { IDbEntities } from 'src/database/entities';

@Injectable()
export class AlbumService extends CommonService {
  createOne(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      artistId: null,
      ...createAlbumDto,
    };

    database.albums = [...database.albums, newAlbum];

    return newAlbum;
  }

  async updateOne(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.getOne(id, IDbEntities.ALBUMS);

    const albumIndex = database.albums.findIndex((album) => album.id);

    const updAlbum = {
      ...album,
      ...updateAlbumDto,
    };

    database.albums[albumIndex] = updAlbum;

    return updAlbum;
  }

  async delete(id: string, field: string) {
    database.favs.albums = database.favs.albums.filter((id) => id !== id);

    database.tracks.forEach((track) =>
      track.albumId === id ? (track.albumId = null) : track.albumId,
    );

    super.delete(id, field);
  }
}
