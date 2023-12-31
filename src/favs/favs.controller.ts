import { IRoutes } from '../routes';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Get,
  Param,
  HttpCode,
  Post,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';

import { ERR_MSGS } from 'src/utils/messages';
import { FavsService } from './favs.service';

@ApiTags(IRoutes.favs)
@Controller(IRoutes.favs)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getFavs() {
    return await this.favsService.getFavs();
  }

  @Post('track/:id')
  async addTrackToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favsService.addToFavs(id, IRoutes.track);

    if (track) {
      throw new HttpException(
        ERR_MSGS.ALREADY_EXISTS('Track'),
        HttpStatus.CREATED,
      );
    }

    throw new HttpException(
      ERR_MSGS.NOT_FOUND('Track', id),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Post('album/:id')
  async addAlbumToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favsService.addToFavs(id, IRoutes.album);

    if (album) {
      throw new HttpException(
        ERR_MSGS.ALREADY_EXISTS('Album'),
        HttpStatus.CREATED,
      );
    }

    throw new HttpException(
      ERR_MSGS.NOT_FOUND('Album', id),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Post('artist/:id')
  async addArtistToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.favsService.addToFavs(id, IRoutes.artist);

    if (artist) {
      throw new HttpException(
        ERR_MSGS.ALREADY_EXISTS('Artist'),
        HttpStatus.CREATED,
      );
    }

    throw new HttpException(
      ERR_MSGS.NOT_FOUND('Artist', id),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favsService.deleteFromFavs(id, IRoutes.track);

    if (!track) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Track', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.favsService.deleteFromFavs(id, IRoutes.album);

    if (!album) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Album', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.favsService.deleteFromFavs(id, IRoutes.artist);

    if (!artist) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
