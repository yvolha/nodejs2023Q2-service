import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { database } from 'src/database/database';
import { CommonService } from 'src/common/common.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { IDbEntities } from 'src/database/entities';

@Injectable()
export class TrackService extends CommonService {
  createOne(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuid(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };

    database.tracks = [...database.tracks, newTrack];

    return newTrack;
  }

  async updateOne(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.getOne(id, IDbEntities.TRACKS);

    const trackIndex = database.tracks.findIndex((track) => track.id);

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    database.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  async delete(id: string, field: string) {
    database.favs.tracks = database.favs.tracks.filter((id) => id !== id);

    super.delete(id, field);
  }
}
