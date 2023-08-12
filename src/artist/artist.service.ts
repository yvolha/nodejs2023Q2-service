import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { database } from 'src/database/database';
import { CommonService } from 'src/common/common.service';
import { IDbEntities } from 'src/database/entities';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { IArtist } from './artist.interface';
import { IAlbum } from 'src/album/album.interface';
import { ITrack } from 'src/track/track.interface';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService  {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    
    return await this.prisma.artist.findMany();
  }




}
