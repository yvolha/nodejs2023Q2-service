import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Get,
  Param,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import { Artist } from '@prisma/client';

import { IRoutes } from '../routes';
import { ArtistService } from './artist.service';
import { IDbEntities } from 'src/database/entities';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { IArtist } from './artist.interface';

@Controller(IRoutes.artist)
@ApiTags(IRoutes.artist)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.artistService.getAll(IRoutes.artist);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<IArtist> {
    const artist = await this.artistService.getOne(id, IRoutes.artist);

    if (artist) {
      return artist as IArtist;
    } else {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createOne(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto, IRoutes.artist);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.getOne(id, IRoutes.artist);

    if (!artist) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.artistService.update(id, updateArtistDto, IRoutes.artist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const artist = await this.artistService.getOne(id, IRoutes.artist);

    if (!artist) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artistService.delete(id, IDbEntities.ALBUMS);
  }

}
