import { Controller } from '@nestjs/common';
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

import { IRoutes } from '../routes';
import { ArtistService } from './artist.service';
import { IDbEntities } from 'src/database/entities';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateAlbumDto, UpdateAlbumDto } from './artist.dto';

@Controller(IRoutes.artist)
export class ArtistController {
  constructor(private readonly albumService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.albumService.getAll(IDbEntities.ALBUMS);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.getOne(id, IDbEntities.ALBUMS);

    if (album) {
      return album;
    } else {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createOne(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createOne(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumService.getOne(id, IDbEntities.ALBUMS);

    if (!album) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.albumService.updateOne(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const album = await this.albumService.getOne(id, IDbEntities.ALBUMS);

    if (!album) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumService.delete(id, IDbEntities.ALBUMS);
  }
}
