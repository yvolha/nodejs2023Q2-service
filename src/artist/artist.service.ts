import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { database } from 'src/database/database';
import { CommonService } from 'src/utils/commonService';
import { IDbEntities } from 'src/database/entities';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';

@Injectable()
export class ArtistService extends CommonService {
  createOne(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuid(),
      ...createArtistDto,
    };

    database.artists = [...database.artists, newArtist];

    return newArtist;
  }

  async updateOne(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.getOne(id, IDbEntities.ARTISTS);

    const artistIndex = database.artists.findIndex((artist) => artist.id);

    const updArtist = {
      ...artist,
      ...updateArtistDto,
    };

    database.artists[artistIndex] = updArtist;

    return updArtist;
  }

  async delete(id: string, field: string) {
    database.favs.artists = database.favs.artists.filter((id) => id !== id);

    database.tracks.forEach((track) =>
      track.artistId === id ? (track.artistId = null) : track.artistId,
    );

    database.albums.forEach((album) =>
      album.artistId === id ? (album.artistId = null) : album.artistId,
    );

    super.delete(id, field);
  }
}
