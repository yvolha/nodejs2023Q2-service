import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { NIL } from 'uuid';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async getFavs() {
    const favs = await this.prisma.favs.findUnique({
      where: { id: NIL },
      select: {
        tracks: {
          select: {
            id: true,
            name: true,
            artistId: true,
            albumId: true,
            duration: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
      },
    });

    if (!favs) {
      return await this.prisma.favs.create({
        data: {
          id: NIL,
        },
        select: {
          tracks: {
            select: {
              id: true,
              name: true,
              artistId: true,
              albumId: true,
              duration: true,
            },
          },
          artists: {
            select: {
              id: true,
              name: true,
              grammy: true,
            },
          },
          albums: {
            select: {
              id: true,
              name: true,
              year: true,
              artistId: true,
            },
          },
        },
      });
    }

    return favs;
  }

  async addToFavs(id: string, field: string) {
    return await this.prisma[field].update({
      where: {
        id: id,
      },
      data: {
        favoritesId: NIL,
      },
    });
  }

  async deleteFromFavs(id: string, field: string) {
    return await this.prisma[field].update({
      where: {
        id: id,
      },
      data: {
        favoritesId: null,
      },
    });
  }
}
