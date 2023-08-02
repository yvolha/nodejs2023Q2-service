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
import { ArtistService } from './artist.service';
import { IDbEntities } from 'src/database/entities';
import { ERR_MSGS } from 'src/utils/messages';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';

@Controller(IRoutes.artist)
@ApiTags(IRoutes.artist)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.artistService.getAll(IDbEntities.ARTISTS);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.getOne(id, IDbEntities.ARTISTS);

    if (artist) {
      return artist;
    } else {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createOne(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createOne(createArtistDto);
  }

  @Put(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.getOne(id, IDbEntities.ARTISTS);

    if (!artist) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.artistService.updateOne(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const artist = await this.artistService.getOne(id, IDbEntities.ARTISTS);

    if (!artist) {
      throw new HttpException(
        ERR_MSGS.NOT_FOUND('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artistService.delete(id, IDbEntities.ARTISTS);
  }
}
