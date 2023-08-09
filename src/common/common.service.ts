import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';
import { database } from 'src/database/database';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { ITrack } from 'src/track/track.interface';

export class CommonService {
  constructor(private prismaService: PrismaService) {}

  async getAll(field: string): Promise<Array<IArtist | IAlbum | ITrack>> {
    console.log(this.prismaService);
    return await this.prismaService[field].findMany();
  }

  async getOne(
    id: string,
    field: string,
  ): Promise<IArtist | IAlbum | ITrack | undefined> {
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
