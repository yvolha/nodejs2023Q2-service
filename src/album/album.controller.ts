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

import { IRoutes } from '../routes';
import { AlbumService } from './album.service';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { IAlbum } from './album.interface';

@Controller(IRoutes.album)
@ApiTags(IRoutes.album)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.albumService.getAll(IRoutes.album);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<IAlbum> {
    const album = await this.albumService.getOne(id, IRoutes.album);

    if (album) {
      return album as IAlbum;
    } else {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createOne(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto, IRoutes.album);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumService.getOne(id, IRoutes.album);

    if (!album) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.albumService.update(id, updateAlbumDto, IRoutes.album);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const album = await this.albumService.getOne(id, IRoutes.album);

    if (!album) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumService.delete(id, IRoutes.album);
  }
}
