import { Album, Artist, Track } from '@prisma/client';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/album/album.dto';
import { CreateArtistDto, UpdateArtistDto } from 'src/artist/artist.dto';
import { CreateTrackDto, UpdateTrackDto } from 'src/track/track.dto';

@Injectable()
export class CommonService {
  constructor(private prisma: PrismaService) {}

  async getAll(field: string): Promise<Artist[] | Album[] | Track[]> {
    return await this.prisma[field].findMany();
  }

  async getOne(id: string, field: string): Promise<Artist | Album | Track> {
    return await this.prisma[field].findUnique({
      where: {
        id,
      },
    });
  }

  async create(
    data: CreateAlbumDto | CreateArtistDto | CreateTrackDto,
    field: string,
  ) {
    return await this.prisma[field].create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdateAlbumDto | UpdateArtistDto | UpdateTrackDto,
    field: string,
  ): Promise<Artist | Album | Track> {
    return await this.prisma[field].update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string, field: string) {
    return await this.prisma[field].delete({
      where: {
        id,
      },
    });
  }
}
